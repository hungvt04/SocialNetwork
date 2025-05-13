package com.hungvt.be.core.client.cmanagearticle.repository;

import com.hungvt.be.core.client.cmanagearticle.model.response.CGetArticleResponse;
import com.hungvt.be.repository.ArticleRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CAArticleRepository extends ArticleRepository {

    @Query(value = """
			SELECT
				a.id AS articleId,
				u.id AS authorId,
				u.full_name AS authorName,
				a.created_at,
				a.content,
				GROUP_CONCAT(it.url) AS urls,
				a.total_react AS totalReact,
				r.`type` AS react
			 FROM
				article a
			 LEFT JOIN `user` u ON
				a.author_id = u.id
			 LEFT JOIN image_temp it ON
				a.id = it.article_id
			 LEFT JOIN user_react_temp urt ON
				a.id = urt.article_id
			 LEFT JOIN `user` u2 ON
				urt.user_id = u2.id
			 LEFT JOIN react r ON
				urt.react_id = r.id
			 WHERE
				(:userId IS NULL OR u2.id LIKE CONCAT('%', :userId, '%'))
			 GROUP BY
				a.id,
				u.id ,
				u.full_name,
				a.created_at,
				a.content,
				a.total_react,
				r.`type`
            """, nativeQuery = true)
    List<CGetArticleResponse> getAllArticle(String userId);


	@Query(value = """
			SELECT
				a.id AS articleId,
				u.id AS authorId,
				u.full_name AS authorName,
				a.created_at,
				a.content,
				GROUP_CONCAT(it.url) AS urls,
				a.total_react
			FROM
				article a
			LEFT JOIN `user` u ON
				a.author_id = u.id
			LEFT JOIN image_temp it ON
				a.id = it.article_id
			GROUP BY
				a.id,
				u.id ,
				u.full_name,
				a.created_at,
				a.content,
				a.total_react
			""", nativeQuery = true)
	List<CGetArticleResponse> getInfoArticle();

}
