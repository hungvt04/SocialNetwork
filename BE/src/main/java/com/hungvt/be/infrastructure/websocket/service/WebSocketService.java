package com.hungvt.be.infrastructure.websocket.service;

import com.hungvt.be.infrastructure.websocket.model.request.ChatMessage;
import com.hungvt.be.infrastructure.websocket.model.request.ChatPrivateRequest;

public interface WebSocketService {

    void chatPrivate(ChatPrivateRequest request, String user1, String user2);

    void chatGroup(ChatMessage message, String groupId);

    void notification(String destination, String content);

}
