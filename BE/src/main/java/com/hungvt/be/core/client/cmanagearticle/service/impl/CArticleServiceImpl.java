package com.hungvt.be.core.client.cmanagearticle.service.impl;

import com.hungvt.be.core.client.cmanagearticle.model.request.CPostArticleRequest;
import com.hungvt.be.core.client.cmanagearticle.repository.CAArticleCommentRepository;
import com.hungvt.be.core.client.cmanagearticle.repository.CAArticleRepository;
import com.hungvt.be.core.client.cmanagearticle.repository.CAHashtagRepository;
import com.hungvt.be.core.client.cmanagearticle.repository.CAHashtagTempRepository;
import com.hungvt.be.core.client.cmanagearticle.repository.CAImageTempRepository;
import com.hungvt.be.core.client.cmanagearticle.repository.CAUserRepository;
import com.hungvt.be.core.client.cmanagearticle.service.CArticleService;
import com.hungvt.be.entity.Article;
import com.hungvt.be.entity.Hashtag;
import com.hungvt.be.entity.HashtagTemp;
import com.hungvt.be.entity.ImageTemp;
import com.hungvt.be.entity.User;
import com.hungvt.be.entity.UserArticle;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.constant.ArticleStatus;
import com.hungvt.be.infrastructure.utils.GenerateUUID;
import com.hungvt.be.infrastructure.utils.VariablesGlobal;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return ResponseObject.ofData(articleRepository.getAllArticle());
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
	public ResponseObject reactArticle() {
		return null;
	}

}
