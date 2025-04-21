package com.hungvt.be.exception;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hungvt.be.constant.MappingUrl;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@RequiredArgsConstructor
@Log4j2
public class AuthExceptionResponse {

	private final HttpServletResponse response;

	public void unauthorized() {
		String message = "Unauthorized - Token không hợp lệ hoặc đã hết hạn!!!";
		int code = 401;
		String moreInformation = MappingUrl.URL_EXCEPTION + code;
		
		ErrorResponse errorResponse = new ErrorResponse(message, message, null, code, moreInformation);
        
        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
		try {
			json = objectMapper.writeValueAsString(errorResponse);
        	response.setContentType("application/json; charset=UTF-8");
		    response.setCharacterEncoding("UTF-8");
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write(json);
		} catch (JsonProcessingException e) {
			log.error("Không thể chuyển đổi object sang chuỗi: {}", e.getMessage());
		} catch (IOException e) {
			log.error("Lỗi IOException: {}", e.getMessage());
		}
	}
	
	public void forbidden() {
		String message = "Forbidden - Bạn không có quyền truy cập tài nguyên này!!!";
		int code = 403;
		String moreInformation = MappingUrl.URL_EXCEPTION + code;
		
		ErrorResponse errorResponse = new ErrorResponse(message, message, null, code, moreInformation);
        
        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
		try {
			json = objectMapper.writeValueAsString(errorResponse);
        	response.setContentType("application/json; charset=UTF-8");
		    response.setCharacterEncoding("UTF-8");
	        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			response.getWriter().write(json);
		} catch (JsonProcessingException e) {
			log.error("Không thể chuyển đổi object sang chuỗi: {}", e.getMessage());
		} catch (IOException e) {
			log.error("Lỗi IOException: {}", e.getMessage());
		}
	}
	
}
