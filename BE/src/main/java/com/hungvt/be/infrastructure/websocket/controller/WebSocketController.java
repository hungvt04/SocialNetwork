package com.hungvt.be.infrastructure.websocket.controller;

import com.hungvt.be.infrastructure.constant.Topic;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/notification")
    @SendTo("/topic/notification")
    public String sendNotification(String message) {
        return message;
    }

    @MessageMapping("/add-friend") // client gửi đến /app/chat.send
    @SendTo(Topic.TOPIC_ADD_FRIEND) // server phát lại cho tất cả client tại đây
    public String sendMessage(@Payload String message) {
//        simpMessagingTemplate.convertAndSendToUser();
        return message;
    }

    @MessageMapping("/add-friend1") // client gửi đến /app/chat.send
    @SendTo(Topic.TOPIC_ADD_FRIEND) // server phát lại cho tất cả client tại đây
    public String sendMessage1(@Payload String message) {
        return message;
    }

}
