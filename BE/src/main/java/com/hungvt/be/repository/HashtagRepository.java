package com.hungvt.be.repository;

import com.hungvt.be.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, String> {

    boolean existsByContent(String content);

    List<Hashtag> findByContent(String content);

}
