package com.hungvt.be.infrastructure.utils;

import com.hungvt.be.infrastructure.security.CustomerUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Log4j2
@RequiredArgsConstructor
public class JwtUtils {

    @Value("${jwt.secretKey}")
    private String SECRET_KEY;

    @Value("${jwt.expiredAccessToken}")
    private long EXPIRED_ACCESS_TOKEN;

    @Value("${jwt.expiredRefreshToken}")
    private long EXPIRED_REFRESH_TOKEN;

    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String getRole(Collection<? extends GrantedAuthority> authorities) {

        StringBuilder result = new StringBuilder();
        for (GrantedAuthority grantedAuthority : authorities) {
            result.append(grantedAuthority.getAuthority()).append(", ");
        }

        return result.substring(0, result.length() - 2);
    }

    public String generateAccessToken(CustomerUserDetails userDetails, boolean isAccessToken) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", userDetails.getUsername());
        claims.put("id", userDetails.getId());
        claims.put("fullname", userDetails.getFullname());
        claims.put("email", userDetails.getEmail());
        long expiedTime = EXPIRED_REFRESH_TOKEN;

        if (isAccessToken) {
            claims.put("role", userDetails.getRoles().toString());
            expiedTime = EXPIRED_ACCESS_TOKEN;
        }

        return Jwts.builder()
                .addClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + expiedTime))
                .setIssuedAt(new Date())
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Long getExpiredRefreshToken(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody().getExpiration().getTime();
    }

    public Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getIdFromToken(String token) {
        Claims claims = getClaims(token);
        String id = claims.get("id", String.class);
        if (id != null && !id.isEmpty()) {
            return id;
        }
        return claims.get("id", String.class);
    }

    public boolean isValidToken(String token) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("❌ Token hết hạn: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("❌ Token không được hỗ trợ: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("❌ Token sai định dạng: {}", e.getMessage());
        } catch (SecurityException e) {
            log.error("❌ Chữ ký Token không hợp lệ: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("❌ Token rỗng hoặc null: {}", e.getMessage());
        }
        return false;
    }

    public String getTokenFromRequest(HttpServletRequest request) {

        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
