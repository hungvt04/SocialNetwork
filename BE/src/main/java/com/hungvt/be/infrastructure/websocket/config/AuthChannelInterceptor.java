//package com.hungvt.be.infrastructure.websocket.config;
//
//import com.hungvt.be.infrastructure.constant.Topic;
//import com.hungvt.be.infrastructure.security.CustomerUserDetailService;
//import com.hungvt.be.infrastructure.utils.JwtUtils;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.messaging.support.MessageBuilder;
//import org.springframework.stereotype.Component;
//import org.springframework.util.AntPathMatcher;
//
//import java.nio.charset.StandardCharsets;
//import java.util.Map;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class AuthChannelInterceptor implements ChannelInterceptor {
//
//    private final JwtUtils jwtUtils;
//
//    private final CustomerUserDetailService userDetailsService;
//
////    private final SimpMessagingTemplate messagingTemplate;
//
//    /**
//     * Khi thực hiện CONNECT thì destination chưa có giá trị
//     * mà destination có giá trị khi thực hiện SUBSCRIBE, SEND,...
//     */
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
//        String destination = accessor.getDestination();
////        List<String> nativeHeaders = new ArrayList<>();
//
//        log.info("PreSend command: {}", accessor.getCommand());
//
//        String authHeader = accessor.getFirstNativeHeader("Authorization");
//        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
//            if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                String token = authHeader.substring(7);
//                String userId = jwtUtils.getIdFromToken(token);
//                assert sessionAttributes != null;
//                sessionAttributes.put("userId", userId);
//            } else {
//                log.warn("Missing or invalid Authorization header");
//                return createErrorMessage(accessor, "AUTH_ERROR", "Not found token!!!");
//            }
//        }
//
//        if (!StompCommand.CONNECT.equals(accessor.getCommand())) {
//            log.info("destination: {}", destination);
//            // Lấy userId từ sessionAttributes
//            assert sessionAttributes != null;
//            String userId = (String) sessionAttributes.get("userId");
//            if (destination != null && destination.contains(Topic.TOPIC_CHAT_PRIVATE)) {
//                String regex = Topic.TOPIC_CHAT_PRIVATE + "/{user1}/{user2}";
//                String user1 = getDestinationVariable(destination, regex, "user1");
//                String user2 = getDestinationVariable(destination, regex, "user2");
//                log.info("user1: {}", user1);
//                log.info("user2: {}", user2);
//                if (user1 == null || user2 == null) {
//                    log.error("Invalid destination format: {}", destination);
//                    return createErrorMessage(accessor, "DESTINATION_ERROR", "Invalid destination format");
//                }
//                // Kiểm tra người kết nối có phải là user1 hoặc user2 không
//                if (!user1.equals(userId) && !user2.equals(userId)) {
//                    log.error("User not found: {}", userId);
//                    try {
//                        // Đóng session ngay lập tức
////                        if (accessor.getSessionId() != null) {
////                            SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(StompCommand.ERROR);
////                            headerAccessor.setSessionId(accessor.getSessionId());
////                            headerAccessor.setLeaveMutable(true);
////                            messagingTemplate.convertAndSendToUser(
////                                    accessor.getSessionId(),
////                                    "/queue/errors",
////                                    "Not permission",
////                                    headerAccessor.getMessageHeaders()
////                            );
////                        }
//                    } catch (Exception e) {
//                        log.error("Failed to send error message", e);
//                    }
//                    // Trả về null để ngắt kết nối
//                    return null;
//                }
//            }
//
//            if (destination != null && destination.contains(Topic.TOPIC_CHAT_GROUP)) {
//                String regex = Topic.TOPIC_CHAT_GROUP + "/{groupId}";
//                String groupId = getDestinationVariable(destination, regex, "groupId");
//                log.info("groupId: {}", groupId);
//            }
//
//        }
//
//        return message;
//    }
//
//    private Message<?> createErrorMessage(StompHeaderAccessor accessor, String errorCode, String errorMessage) {
//        log.error("WebSocket connection error [{}]: {}", errorCode, errorMessage);
//        log.error("errorMessage: {}", errorMessage);
//        // Tạo headers cho message lỗi
//        StompHeaderAccessor errorAccessor = StompHeaderAccessor.create(StompCommand.ERROR);
//        errorAccessor.setMessage(errorMessage);
//        errorAccessor.setHeader("error-code", errorCode);
//        errorAccessor.setSessionId(accessor.getSessionId());
//
//        return MessageBuilder.createMessage(
//                errorMessage.getBytes(StandardCharsets.UTF_8),
//                errorAccessor.getMessageHeaders()
//        );
//    }
//
//    private String getDestinationVariable(String destination, String regex, String variableName) {
//
//        log.info("Destination: {}", destination);
//        log.info("Regex: {}", regex);
//        log.info("Variable name: {}", variableName);
//        AntPathMatcher pathMatcher = new AntPathMatcher();
//        if (pathMatcher.match(regex, destination)) {
//            Map<String, String> variables = pathMatcher.extractUriTemplateVariables(
//                    regex,
//                    destination
//            );
//
//            return variables.get(variableName);
//        }
//        log.error("Destination does not match the expected pattern: {}", destination);
//        return null;
//    }
//
//}
