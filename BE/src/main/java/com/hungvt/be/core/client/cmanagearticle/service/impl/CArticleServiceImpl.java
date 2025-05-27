package com.hungvt.be.core.client.cmanagearticle.service.impl;

import com.hungvt.be.core.client.cmanagearticle.model.request.CPostArticleRequest;
import com.hungvt.be.core.client.cmanagearticle.model.response.CGetArticleResponse;
import com.hungvt.be.core.client.cmanagearticle.repository.*;
import com.hungvt.be.core.client.cmanagearticle.service.CArticleService;
import com.hungvt.be.entity.*;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.constant.ArticleStatus;
import com.hungvt.be.infrastructure.constant.ReactionType;
import com.hungvt.be.infrastructure.constant.Topic;
import com.hungvt.be.infrastructure.exception.RestException;
import com.hungvt.be.infrastructure.utils.GenerateUUID;
import com.hungvt.be.infrastructure.utils.VariablesGlobal;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CArticleServiceImpl implements CArticleService {

    private final CAArticleRepository articleRepository;

    private final CAHashtagRepository hashtagRepository;

    private final CAArticleCommentRepository articleCommentRepository;

    private final CAHashtagTempRepository hashtagTempRepository;

    private final CAImageTempRepository imageTempRepository;

    private final CAUserRepository userRepository;

    private final CAReactRepository reactRepository;

    private final CAUserReactTempRepository userReactTempRepository;

    private final SimpMessagingTemplate messagingTemplate;


    private void handleHashtags(Article article, List<String> hashtags) {
        if (hashtags == null || hashtags.isEmpty()) {
            return;
        }
        for (String hashtag : hashtags) {
            List<Hashtag> hashtagList = hashtagRepository.findByContent(hashtag);
            Hashtag newHashtag;
            if (hashtagList.isEmpty()) {
                newHashtag = new Hashtag();
                newHashtag.setId(GenerateUUID.generateUUID());
                newHashtag.setContent(hashtag);
                hashtagRepository.save(newHashtag);
            } else {
                newHashtag = hashtagList.get(0);
            }
            HashtagTemp hashtagTemp = new HashtagTemp();
            hashtagTemp.setArticle(article);
            hashtagTemp.setHashtag(newHashtag);
            hashtagTempRepository.save(hashtagTemp);
        }
    }

    private void handleImage(Article article, List<String> images) {
        if (images == null || images.isEmpty()) {
            return;
        }
        for (String image : images) {
            List<ImageTemp> imageTempList = imageTempRepository.findByUrl(image);
            if (!imageTempList.isEmpty()) {
                imageTempList.get(0).setArticle(article);
                imageTempRepository.save(imageTempList.get(0));
            }
        }
    }

    private void handleMembers(Article article, List<String> members) {
        if (members == null || members.isEmpty()) {
            return;
        }
        for (String member : members) {
            Optional<User> memberOptional = userRepository.findById(member);

            if (memberOptional.isEmpty()) {
                throw new RuntimeException("User not found with id: " + member);
            }
            User user = memberOptional.get();
            UserArticle userArticle = new UserArticle();
            userArticle.setArticle(article);
            userArticle.setUser(user);
        }
    }

    @Override
    public ResponseObject getAllArticles() {
        User user = VariablesGlobal.USER;
        Map<String, Object> response = new HashMap<>();
        List<CGetArticleResponse> infoArticles = articleRepository.getInfoArticle();

        messagingTemplate.convertAndSend(Topic.TOPIC_NOTIFICATION + "/" + VariablesGlobal.USER.getId(),
                "Bạn nhận được thông báo mới.");

        return ResponseObject.ofData(articleRepository.getInfoArticle());
    }

    @Override
    @Transactional
    public ResponseObject postArticle(CPostArticleRequest request) {

        Article article = new Article();
        article.setContent(request.getContent());
        System.out.println("request.getStatus() = " + request.getStatus());
        article.setStatus(ArticleStatus.PRIVATE);
        article.setStatus(ArticleStatus.valueOf(request.getStatus()));
        article.setAuthor(VariablesGlobal.USER);
        Article savedArticle = articleRepository.save(article);

        this.handleHashtags(savedArticle, request.getHashtags());
        this.handleImage(savedArticle, request.getImages());
        this.handleMembers(savedArticle, request.getMembers());

        return ResponseObject.ofData(null, "Post article successfully");
    }

    @Override
    public ResponseObject reactArticle(String articleId, String type) {

        Optional<Article> articleOptional = articleRepository.findById(articleId);
        if (articleOptional.isEmpty()) {
            throw new RestException("Article not found with id: " + articleId);
        }

        ReactionType reactionType = ReactionType.valueOf(type);
        List<React> reacts = reactRepository.findByType(reactionType);
        if (reacts.isEmpty()) {
            throw new RestException("React not found with type: " + reactionType);
        }

        Article article = articleOptional.get();
        User user = VariablesGlobal.USER;
        React react = reacts.get(0);

        List<UserReactTemp> userReactTemps = userReactTempRepository.findByReactArticle(user.getId(), articleId);
        UserReactTemp userReactTemp;
        if (userReactTemps.isEmpty()) {
            userReactTemp = new UserReactTemp();
            userReactTemp.setArticle(article);
            userReactTemp.setReact(reacts.get(0));
            userReactTemp.setUser(VariablesGlobal.USER);

            article.setTotalReact(article.getTotalReact() != null ? article.getTotalReact() + 1 : 1);
            articleRepository.save(article);
        } else {
            userReactTemp = userReactTemps.get(0);
            userReactTemp.setReact(react);
        }

        userReactTempRepository.save(userReactTemp);
        messagingTemplate.convertAndSend(Topic.TOPIC_NOTIFICATION + "/" + VariablesGlobal.USER.getId(),
                "Bạn vừa react.");

        return ResponseObject.ofData(null);
    }

    @Override
    public ResponseObject deleteReactArticle(String articleId) {

        Optional<Article> articleOptional = articleRepository.findById(articleId);
        if (articleOptional.isEmpty()) {
            throw new RestException("Article not found with id: " + articleId);
        }

        User user = VariablesGlobal.USER;
        List<UserReactTemp> userReactTemps = userReactTempRepository.findByReactArticle(user.getId(), articleId);
        if (userReactTemps.isEmpty()) {
            throw new RestException("Users have not reacted to the post yet.");
        }

        UserReactTemp userReactTemp = userReactTemps.get(0);
        userReactTempRepository.delete(userReactTemp);

        Article article = articleOptional.get();
        article.setTotalReact(article.getTotalReact() > 1 ? article.getTotalReact() - 1 : 0);
        articleRepository.save(article);
        return ResponseObject.ofData(null);
    }

}
