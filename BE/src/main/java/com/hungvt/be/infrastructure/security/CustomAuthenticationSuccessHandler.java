package com.hungvt.be.infrastructure.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hungvt.be.entity.Token;
import com.hungvt.be.entity.User;
import com.hungvt.be.infrastructure.constant.Role;
import com.hungvt.be.infrastructure.utils.JwtUtils;
import com.hungvt.be.repository.TokenRepository;
import com.hungvt.be.repository.UserRepository;
import com.hungvt.be.response.TokenResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Log4j2
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;

    private final JwtUtils jwtUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        System.out.println("===> OAuth2User attributes:");
        oAuth2User.getAttributes().forEach((key, value) -> {
            System.out.println(key + " : " + value);
        });

        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        User user = null;
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            user = new User();
            user.setRoles(List.of(Role.USER));
        } else {
            user = userOptional.get();
        }

        user.setEmail(email);
        user.setFullName(fullName);
        user.setAvatar(picture);
        user = userRepository.save(user);

        CustomerUserDetails customerUserDetails = new CustomerUserDetails();
        customerUserDetails.setId(user.getId());
        customerUserDetails.setEmail(user.getEmail());
        customerUserDetails.setUsername(user.getUsername());
        customerUserDetails.setRoles(List.of(user.getRoles().toString()));
        customerUserDetails.setFullname(user.getFullName());

        String accessToken = jwtUtils.generateAccessToken(customerUserDetails, true);
        String refreshToken = jwtUtils.generateAccessToken(customerUserDetails, false);

        System.out.println("accessToken: " + accessToken);
        System.out.println("refreshToken: " + refreshToken);

        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setExpired(jwtUtils.getExpiredRefreshToken(refreshToken));
        tokenRepository.save(token);

        TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
        try {
            json = objectMapper.writeValueAsString(tokenResponse);
            response.setContentType("application/json; charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(json);
            response.sendRedirect("http://localhost:5173/oauth2/callback?accessToken=" + accessToken);
        } catch (JsonProcessingException e) {
            log.error("Không thể chuyển đổi object sang chuỗi: {}", e.getMessage());
        } catch (IOException e) {
            log.error("Lỗi IOException: {}", e.getMessage());
        }

    }

}
