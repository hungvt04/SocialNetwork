package com.hungvt.be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hungvt.be.entity.Token;

@Repository
public interface ITokenRepository extends JpaRepository<Token, String> {

	boolean existsByAccsessToken(String accessToken);

}
