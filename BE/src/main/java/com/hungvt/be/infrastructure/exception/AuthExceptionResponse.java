package com.hungvt.be.infrastructure.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hungvt.be.infrastructure.common.model.response.ResponseError;
import com.hungvt.be.infrastructure.constant.MappingUrl;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Log4j2
public class AuthExceptionResponse {

    private final HttpServletResponse response;

    public void unauthorized() {
        String message = "Unauthorized - Token không hợp lệ hoặc đã hết hạn!!!";
        int code = 401;
        String moreInformation = MappingUrl.URL_EXCEPTION + code;

        ResponseError responseError = new ResponseError(message, message, null, code, moreInformation);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
        try {
            json = objectMapper.writeValueAsString(responseError);
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

        ResponseError responseError = new ResponseError(message, message, null, code, moreInformation);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = null;
        try {
            json = objectMapper.writeValueAsString(responseError);
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
