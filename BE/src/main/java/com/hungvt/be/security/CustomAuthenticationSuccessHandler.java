package com.hungvt.be.security;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hungvt.be.constant.Role;
import com.hungvt.be.entity.User;
import com.hungvt.be.repository.IUserRepository;
import com.hungvt.be.response.TokenResponse;
import com.hungvt.be.utils.JwtUtils;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@RequiredArgsConstructor
@Log4j2
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
	
	private final IUserRepository userRepository;
	
	private final JwtUtils jwtUtils;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String fullname = oAuth2User.getAttribute("name");
        
        User user = null;
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()) {
        	user = new User();
        	user.setRoles(List.of(Role.USER));
        } else {
        	user = userOptional.get();
        }
    	
    	user.setEmail(email);
    	user.setFullname(fullname);
    	user = userRepository.save(user);
        
        CustomerUserDetails customerUserDetails = new CustomerUserDetails();
        customerUserDetails.setId(user.getId());
        customerUserDetails.setEmail(user.getEmail());
        customerUserDetails.setUsername(user.getUsername());
        customerUserDetails.setRoles(List.of(user.getRoles().toString()));
        
        String accessToken = jwtUtils.generateAccessToken(customerUserDetails, true);
        String refreshToken = jwtUtils.generateAccessToken(customerUserDetails, true);
        
        System.out.println("accessToken: " + accessToken);
        System.out.println("refreshToken: " + refreshToken);

        TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
		try {
			json = objectMapper.writeValueAsString(tokenResponse);
        	response.setContentType("application/json; charset=UTF-8");
		    response.setCharacterEncoding("UTF-8");
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write(json);
			response.sendRedirect("http://localhost:5173/oauth2/callback?accessToken=" + accessToken);
		} catch (JsonProcessingException e) {
			log.error("Không thể chuyển đổi object sang chuỗi: {}", e.getMessage());
		} catch (IOException e) {
			log.error("Lỗi IOException: {}", e.getMessage());
		}
        
	}

}
