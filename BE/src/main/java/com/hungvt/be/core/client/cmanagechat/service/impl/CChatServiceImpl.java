package com.hungvt.be.core.client.cmanagechat.service.impl;

import com.hungvt.be.core.client.cmanagechat.model.request.CDeleteMessageRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CGetMessageChatRoomRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CPostMessageRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CPutMessageRequest;
import com.hungvt.be.core.client.cmanagechat.model.response.CPostMessageResponse;
import com.hungvt.be.core.client.cmanagechat.repository.CCChatRoomRepository;
import com.hungvt.be.core.client.cmanagechat.repository.CCMessageRepository;
import com.hungvt.be.core.client.cmanagechat.repository.CCUserRepository;
import com.hungvt.be.core.client.cmanagechat.service.CChatService;
import com.hungvt.be.entity.ChatRoom;
import com.hungvt.be.entity.Message;
import com.hungvt.be.infrastructure.common.model.response.PageableObject;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.constant.Topic;
import com.hungvt.be.infrastructure.exception.RestException;
import com.hungvt.be.infrastructure.utils.Helper;
import com.hungvt.be.infrastructure.utils.VariablesGlobal;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CChatServiceImpl implements CChatService {

    private final CCChatRoomRepository chatRoomRepository;

    private final CCMessageRepository messageRepository;

    private final CCUserRepository userRepository;

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public ResponseObject getMessageChatRoom(CGetMessageChatRoomRequest request) {

        ChatRoom chatRoom = this.getChatRoom(request.getChatRoomId());
        this.hasPermissionChatRoom(chatRoom);

        return ResponseObject.ofData(
                PageableObject.of(
                        messageRepository.getMessageByChatRoom(Helper.createPageable(request), request)
                )
        );
    }

    @Override
    public ResponseObject postMessage(CPostMessageRequest request) {

        ChatRoom chatRoom = this.getChatRoom(request.getChatRoomId());
        this.hasPermissionChatRoom(chatRoom);

        Message message = new Message();
        message.setRead(false);
        message.setChatRoom(chatRoom);
        message.setSender(VariablesGlobal.USER);
        message.setContent(request.getContent());
        message = messageRepository.save(message);

        CPostMessageResponse response = this.convertCPostMessageResponse(message);
        messagingTemplate.convertAndSend(Topic.TOPIC_CHAT_PRIVATE + "/" + request.getChatRoomId(), response);
        return ResponseObject.ofData(null);
    }

    @Override
    public ResponseObject putMessage(String messageId, CPutMessageRequest request) {

        ChatRoom chatRoom = this.getChatRoom(request.getChatRoomId());
        this.hasPermissionChatRoom(chatRoom);

        Message message = this.getMessage(messageId);
        this.hasPermissionMessage(message);
        message.setContent(request.getContent());
        message = messageRepository.save(message);

        CPostMessageResponse response = this.convertCPostMessageResponse(message);
        messagingTemplate.convertAndSend(Topic.TOPIC_CHAT_PRIVATE + "/" + request.getChatRoomId(), response);
        return ResponseObject.ofData(null);
    }

    @Override
    public ResponseObject deleteMessage(String messageId, CDeleteMessageRequest request) {

        ChatRoom chatRoom = this.getChatRoom(request.getChatRoomId());
        this.hasPermissionChatRoom(chatRoom);

        Message message = this.getMessage(messageId);
        this.hasPermissionMessage(message);
        message.setIsDeleted(true);
        message = messageRepository.save(message);

        CPostMessageResponse response = this.convertCPostMessageResponse(message);
        messagingTemplate.convertAndSend(Topic.TOPIC_CHAT_PRIVATE + "/" + request.getChatRoomId(), response);
        return ResponseObject.ofData(null);
    }

    private ChatRoom getChatRoom(String chatRoomId) {

        Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findById(chatRoomId);
        if(chatRoomOptional.isEmpty()) {
            throw new RestException("Not found chat room with id: " + chatRoomId);
        }
        return chatRoomOptional.get();
    }

    private void hasPermissionChatRoom(ChatRoom chatRoom) {

        if(chatRoom.getUser1().getId().equals(VariablesGlobal.USER.getId()) ||
                chatRoom.getUser2().getId().equals(VariablesGlobal.USER.getId())) {
            return;
        }
        throw new RestException("You don't have permission to access this chat room.");
    }

    private void hasPermissionMessage(Message message) {

        if(message.getSender().getId().equals(VariablesGlobal.USER.getId())) {
            return;
        }
        throw new RestException("You don't have permission to edit this message.");
    }

    private Message getMessage(String messageId) {

        Optional<Message> messageOptional = messageRepository.findById(messageId);
        if (messageOptional.isEmpty()){
            throw new RestException("Not found message with id: " + messageId);
        }
        return messageOptional.get();
    }

    private CPostMessageResponse convertCPostMessageResponse(Message message) {

        CPostMessageResponse response = new CPostMessageResponse();
        response.setMessageId(message.getId());
        response.setSenderId(message.getSender().getId());
        response.setSenderAvatar(message.getSender().getAvatar());
        response.setContent(message.getContent());
        response.setIsRead(message.isRead());
        response.setCreatedAt(message.getCreatedAt());
        response.setUpdatedAt(message.getUpdatedAt());
        response.setIsDeleted(message.getIsDeleted());
        return response;
    }

}
