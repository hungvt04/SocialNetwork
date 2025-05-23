package com.hungvt.be.infrastructure.websocket.config;

import com.hungvt.be.infrastructure.security.CustomerUserDetailService;
import com.hungvt.be.infrastructure.security.CustomerUserDetails;
import com.hungvt.be.infrastructure.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthChannelInterceptor implements ChannelInterceptor {

    private final JwtUtils jwtUtils;

    private final CustomerUserDetailService userDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();

        log.info("PreSend command: {}", accessor.getCommand());
        log.info("");

        // Xử lý CONNECT - thiết lập authentication ban đầu
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            try {
                String authHeader = accessor.getFirstNativeHeader("Authorization");
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);
                    String id = jwtUtils.getIdFromToken(token);

                    CustomerUserDetails userDetails = userDetailsService.loadUserById(id);
                    Principal principal = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());

                    // Set cả Principal và lưu vào session
                    accessor.setUser(principal);
                    if (sessionAttributes != null) {
                        sessionAttributes.put("userId", id);
                        sessionAttributes.put("principal", principal); // Lưu cả principal object
                    }

                    log.info("Authenticated user: {}", principal.getName());
                } else {
                    log.warn("Missing or invalid Authorization header");
                    return createErrorMessage(accessor, "AUTH_ERROR", "Missing or invalid Authorization header");
                }
            } catch (Exception e) {
                log.error("WebSocket token processing error: ", e);
                return null;
            }
        }
        // Với các command khác, khôi phục Principal từ session nếu cần
        else if (accessor.getUser() == null && sessionAttributes != null) {
            Principal principal = (Principal) sessionAttributes.get("principal");
            if (principal != null) {
                accessor.setUser(principal);
                log.info("Restored principal from session: {}", principal.getName());
            } else {
                log.warn("No principal found in session attributes");
            }
        }
        return createErrorMessage(accessor, "AUTH_ERROR", "Missing or invalid Authorization header");

//        if (StompCommand.SEND.equals(accessor.getCommand())) {
//            log.info("SEND command detected");
//            log.info("Current principal: {}",
//                    accessor.getUser() != null ? accessor.getUser().getName() : "null");
//            if (sessionAttributes != null) {
//                log.info("Session attributes: {}", sessionAttributes);
//            }
//        }
//
//        return message;
    }

    private Message<?> createErrorMessage(StompHeaderAccessor accessor, String errorCode, String errorMessage) {
        log.error("WebSocket connection error [{}]: {}", errorCode, errorMessage);

        // Tạo headers cho message lỗi
        StompHeaderAccessor errorAccessor = StompHeaderAccessor.create(StompCommand.ERROR);
        errorAccessor.setMessage(errorMessage);
        errorAccessor.setHeader("error-code", errorCode);
        errorAccessor.setSessionId(accessor.getSessionId());

        return MessageBuilder.createMessage(
                errorMessage.getBytes(StandardCharsets.UTF_8),
                errorAccessor.getMessageHeaders()
        );
    }

}
