//package com.hungvt.be.infrastructure.websocket.config;
//
//import com.hungvt.be.infrastructure.utils.JwtUtils;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class AuthChannelInterceptor implements ChannelInterceptor {
//
//    private final JwtUtils jwtUtils;
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//
//        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
//            try {
//                String authHeader = accessor.getFirstNativeHeader("Authorization");
//                if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                    String token = authHeader.substring(7);
//                    String id = jwtUtils.getIdFromToken(token);
//                    accessor.setUser(new UsernamePasswordAuthenticationToken(id, null, List.of()));
//                } else {
//                    log.warn("❌ Thiếu Authorization header hoặc không đúng định dạng");
//                    return null; // quan trọng: không throw
//                }
//            } catch (Exception e) {
//                log.error("❌ Lỗi khi xử lý token WebSocket: ", e);
//                return null; // quan trọng: không throw
//            }
//        }
//        log.info("PreSend command: {}", accessor.getCommand());
//        log.info("Authorization header: {}", accessor.getFirstNativeHeader("Authorization"));
//
//        return message;
//    }
//}
