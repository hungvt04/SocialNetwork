package com.hungvt.be.core.client.cmanagearticle.repository;

import com.hungvt.be.entity.UserReactTemp;
import com.hungvt.be.repository.UserReactTempRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CAUserReactTempRepository extends UserReactTempRepository {

    @Query(value = """
            SELECT
            	urt
            FROM
            	UserReactTemp urt
            LEFT JOIN Article a ON
            	urt.article.id = a.id
            WHERE
            	urt.comment.id IS NULL
            	AND (:articleId IS NULL OR a.id LIKE CONCAT('%', :articleId, '%'))
            	AND (:userId IS NULL OR urt.user.id LIKE CONCAT('%', :userId, '%'))
            """)
    List<UserReactTemp> findByReactArticle(@Param("userId") String userId, @Param("articleId") String articleId);

}
