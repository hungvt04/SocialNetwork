package com.hungvt.be.core.client.cmanagechat.model.response;

public interface CGetMessageChatRoomResponse {

    String getId();

    String senderId();

    String getFullName();

    String getAvatar();

    String getContent();

    Boolean getIsRead();

}
