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
        String email = getClaims().get("email", String.class);
        if (email != null && !email.isEmpty()) {
            return email;
        }
        return getClaims().get("email", String.class);
    }

    public String getEmailFromToken(String token) {
        Claims claims = jwtUtils.getClaims(token);
        String email = claims.get("email", String.class);
        if (email != null && !email.isEmpty()) {
            return email;
        }
        return claims.get("email", String.class);
    }

//    public String getCurrentUserId() {
//        String jwt = getJwtFromRequest(request);
//        return tokenProvider.getUserIdFromToken(jwt);
//    }
//
//    public String getCurrentUserEmail() {
//        String jwt = getJwtFromRequest(request);
//        return tokenProvider.getEmailFromToken(jwt);
//    }
//
//    public String getCurrentOrganizeFacilityId() {
//        String jwt = getJwtFromRequest(request);
//        return tokenProvider.getOrganizeFacilityIdFromToken(jwt);
//    }

}
