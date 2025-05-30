package com.hungvt.be.core.client.cmanagechat.model.response;

public interface CGetMessageChatRoomResponse {

    String getMessageId();

    String getSenderId();

    String getFullName();

    String getSenderAvatar();

    String getContent();

    Boolean getIsRead();

    Long getCreatedAt();

    Long getUpdatedAt();

    Boolean getIsDeleted();

}
