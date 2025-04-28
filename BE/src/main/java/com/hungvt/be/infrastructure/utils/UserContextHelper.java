package com.hungvt.be.infrastructure.utils;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserContextHelper {

    private final JwtUtils jwtUtils;

    private final HttpServletRequest request;

    private Claims getClaims() {
        String token = jwtUtils.getTokenFromRequest(request);
        return jwtUtils.getClaims(token);
    }

    public String getUserId() {
        return getClaims().get("id", String.class);
    }

    public String getEmail() {
        return getClaims().get("email", String.class);
    }

    public String getUsername() {
        return getClaims().get("username", String.class);
    }
    
}
