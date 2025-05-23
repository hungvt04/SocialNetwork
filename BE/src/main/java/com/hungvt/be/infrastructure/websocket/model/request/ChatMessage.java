package com.hungvt.be.infrastructure.websocket.model.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatMessage {

    private String receiverId;

    private String content;

    private Long timestamp;

}
