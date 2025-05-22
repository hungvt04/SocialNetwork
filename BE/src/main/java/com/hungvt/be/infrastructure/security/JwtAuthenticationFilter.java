package com.hungvt.be.infrastructure.security;

import com.hungvt.be.entity.Token;
import com.hungvt.be.infrastructure.constant.MappingUrl;
import com.hungvt.be.infrastructure.exception.AuthExceptionResponse;
import com.hungvt.be.infrastructure.utils.JwtUtils;
import com.hungvt.be.repository.TokenRepository;
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
import java.util.List;

@Component
@RequiredArgsConstructor
@Log4j2
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final CustomerUserDetailService userDetailsService;

    private final JwtUtils jwtUtils;

    private final TokenRepository tokenRepository;

    private final AuthExceptionResponse authExceptionResponse;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();

        // Bỏ qua JWT filter cho các path public
        if (path.startsWith(MappingUrl.API_COMMON)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = jwtUtils.getTokenFromRequest(request);
        log.info("Token from header: {}", token);
        if (token != null && !token.trim().isEmpty() && !token.equalsIgnoreCase("{{bearerToken}}")) {

            boolean isValidToken = jwtUtils.isValidToken(token);
            List<Token> tokens = tokenRepository.findTokensByAccessToken(token);

            if (!isValidToken || tokens.isEmpty()) {
                authExceptionResponse.unauthorized();
                log.info("Token is invalid!!!");
                return;
            }

            Claims claims = jwtUtils.getClaims(token);
            String username = claims.get("email", String.class);
            CustomerUserDetails userDetails = userDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authToken);
            log.info("Token OK.");
        }
        filterChain.doFilter(request, response);
    }

}
