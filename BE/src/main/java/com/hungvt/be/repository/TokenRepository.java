package com.hungvt.be.repository;

import com.hungvt.be.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {

    boolean existsByAccessToken(String accessToken);

    @Query(value = """
            SELECT t FROM Token t
            WHERE t.accessToken = :accessToken
            """)
    List<Token> findTokensByAccessToken(String accessToken);

    @Query(value = """
            SELECT t FROM Token t
            WHERE t.user.id = :userId
            """)
    List<Token> findTokensByUser(String userId);

}
