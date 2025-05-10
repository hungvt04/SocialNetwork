package com.hungvt.be.core.client.cmanagearticle.repository;

import com.hungvt.be.core.client.cmanagearticle.model.response.CGetArticleResponse;
import com.hungvt.be.repository.ArticleRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CAArticleRepository extends ArticleRepository {

	@Query(value = """
			select
				a.id as articleId, 
				u.id as authorId, 
				u.full_name as authorName, 
				a.created_at, 
				a.content, 
				GROUP_CONCAT(it.url) as urls, 
				a.total_react
			from
				article a
			left join `user` u on
				a.author_id = u.id
			left join image_temp it on
				a.id = it.article_id GROUP BY a.id, u.id , u.full_name, a.created_at, a.content, a.total_react;
			""", nativeQuery = true)
	List<CGetArticleResponse> getAllArticle();

}
