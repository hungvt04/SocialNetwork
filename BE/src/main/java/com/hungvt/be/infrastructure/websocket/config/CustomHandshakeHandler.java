//package com.hungvt.be.infrastructure.websocket.config;
//
//import org.springframework.http.server.ServerHttpRequest;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
//
//import java.security.Principal;
//import java.util.List;
//import java.util.Map;
//
//public class CustomHandshakeHandler extends DefaultHandshakeHandler {
//
//    @Override
//    protected Principal determineUser(ServerHttpRequest request,
//                                      WebSocketHandler wsHandler,
//                                      Map<String, Object> attributes) {
//        // Tự tạo một Principal từ thông tin có sẵn trong request
//        // Có thể lấy token từ header và parse user ở đây nếu cần
//        return new UsernamePasswordAuthenticationToken("userId-123", null, List.of());
//    }
//
//}
