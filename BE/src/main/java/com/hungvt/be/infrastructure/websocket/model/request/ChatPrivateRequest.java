package com.hungvt.be.infrastructure.websocket.model.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatPrivateRequest {

    private String token;

    private String message;

}
