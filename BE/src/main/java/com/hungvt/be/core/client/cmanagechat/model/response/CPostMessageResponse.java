package com.hungvt.be.core.client.cmanagechat.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CPostMessageResponse {

    private String messageId;

    private String content;

    private String senderId;

    private String senderAvatar;

    private Boolean isRead;

    private Long createdAt;

    private Long updatedAt;

    private Boolean isDeleted;

}
