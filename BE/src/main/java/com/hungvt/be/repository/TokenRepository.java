package com.hungvt.be.repository;

import com.hungvt.be.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {

    boolean existsByAccessToken(String accessToken);

}
