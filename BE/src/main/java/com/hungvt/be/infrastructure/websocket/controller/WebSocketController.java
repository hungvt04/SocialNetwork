package com.hungvt.be.infrastructure.websocket.controller;

import com.hungvt.be.infrastructure.constant.Topic;
import com.hungvt.be.infrastructure.websocket.model.request.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    /**
     * @MessageMapping: định nghĩa ENDPOINT để client SEND
     * @SendTo: định nghĩa TOPIC và tự động trả về data khi client send
     * messagingTemplate: cũng tự định nghĩa TOPIC và trả data về TOPIC đó
     */
    @MessageMapping("/notification")
//    @SendTo("/topic/notification")
    public void sendNotification(SimpMessageHeaderAccessor headerAccessor) {
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        String content = "ANONYMOUS";
        if (sessionAttributes != null) {
            content = (String) sessionAttributes.get("userId");
        }
//        messagingTemplate.convertAndSend("/topic/notification", content);
        messagingTemplate.convertAndSend(Topic.TOPIC_NOTIFICATION, content);
    }

    @Scheduled(fixedRate = 5000)
    public void sendMessages() {
        messagingTemplate.convertAndSend("/user/topic/messages", "Hello from server at " + System.currentTimeMillis());
        messagingTemplate.convertAndSendToUser("939d22c0-0661-4f8f-b1a3-b91663fa8d00", "/user/topic/messages", "Hello from server at " + System.currentTimeMillis());
    }

    @MessageMapping("/chat-private/{user1}/{user2}")
    public void sendPrivate(ChatMessage message,
                            @DestinationVariable String user1,
                            @DestinationVariable String user2) {

        log.info("Người gửi: {}", user1);
        log.info("Người gửi: {}", user2);
        // gửi tới người nhận
        log.info("message: {}", message);
        log.info("Gửi tới: {}", message.getReceiverId());
//        messagingTemplate.convertAndSend(
//                "/topic/messages", message
//        );
        messagingTemplate.convertAndSend(
                Topic.TOPIC_CHAT_PRIVATE + "/" + user1 + "/" + user2, message
        );
    }

    @MessageMapping("/chat-group/{groupId}")
    public void sendGroup(ChatMessage message,
                          @DestinationVariable String groupId) {
        messagingTemplate.convertAndSend(
                Topic.TOPIC_CHAT_GROUP + "/" + groupId, message
        );
    }

    @MessageMapping("/error")
    public void sendError(String error) {
        messagingTemplate.convertAndSend(Topic.TOPIC_ERROR, error);
    }

}
