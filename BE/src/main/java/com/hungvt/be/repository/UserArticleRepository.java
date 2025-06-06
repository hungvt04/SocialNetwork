package com.hungvt.be.repository;

import com.hungvt.be.entity.UserArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserArticleRepository extends JpaRepository<UserArticle, String> {
}
