package com.hungvt.be.repository;

import com.hungvt.be.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IHashtagRepository extends JpaRepository<Hashtag, String> {
}
