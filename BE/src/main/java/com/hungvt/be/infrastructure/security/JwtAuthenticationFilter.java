package com.hungvt.be.infrastructure.security;

import com.hungvt.be.infrastructure.exception.AuthExceptionResponse;
import com.hungvt.be.infrastructure.utils.JwtUtils;
import com.hungvt.be.repository.ITokenRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final CustomerUserDetailService userDetailsService;

    private final JwtUtils jwtUtils;

    private final ITokenRepository tokenRepository;

    private final AuthExceptionResponse authExceptionResponse;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = jwtUtils.getTokenFromRequest(request);
        log.info("Token from header: {}", token);
        if (token != null && token.trim().length() > 0 && !token.equalsIgnoreCase("{{bearerToken}}")) {

            log.info("Handle valid token and exist in the database.");
            boolean isValidToken = jwtUtils.isValidToken(token);

            if (!isValidToken) {
                authExceptionResponse.unauthorized();
                return;
            }

            boolean isExists = tokenRepository.existsByAccessToken(token);

            if (isValidToken && isExists) {
                Claims claims = jwtUtils.getClaims(token);
                String username = claims.get("username", String.class);
                CustomerUserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.info("Handle add roles to securityContextHolder.");
            }
        }
        filterChain.doFilter(request, response);
    }

}
