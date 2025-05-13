package com.hungvt.be.repository;

import com.hungvt.be.entity.React;
import com.hungvt.be.infrastructure.constant.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactRepository extends JpaRepository<React, String> {

    List<React> findByType(ReactionType type);

}
