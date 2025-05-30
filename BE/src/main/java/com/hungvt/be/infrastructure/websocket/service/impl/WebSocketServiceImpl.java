//package com.hungvt.be.infrastructure.websocket.service.impl;
//
//import com.hungvt.be.entity.ChatRoom;
//import com.hungvt.be.entity.Message;
//import com.hungvt.be.entity.User;
//import com.hungvt.be.infrastructure.constant.Topic;
//import com.hungvt.be.infrastructure.exception.RestException;
//import com.hungvt.be.infrastructure.utils.JwtUtils;
//import com.hungvt.be.infrastructure.websocket.model.request.ChatMessage;
//import com.hungvt.be.infrastructure.websocket.model.request.ChatPrivateRequest;
//import com.hungvt.be.infrastructure.websocket.service.WebSocketService;
//import com.hungvt.be.repository.ChatRoomRepository;
//import com.hungvt.be.repository.MessageRepository;
//import com.hungvt.be.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class WebSocketServiceImpl implements WebSocketService {
//
////    private final ChatRoomRepository chatRoomRepository;
//
//    private final MessageRepository messageRepository;
//
//    private final UserRepository userRepository;
//
//    private final SimpMessagingTemplate messagingTemplate;
//
//    private final JwtUtils jwtUtils;
//
//    @Override
//    public void chatPrivate(ChatPrivateRequest request, String user1, String user2) {
//        List<ChatRoom> chatRooms = chatRoomRepository.findByUser1AndUser2(user1, user2);
//        if(chatRooms.isEmpty()) {
//            throw new RestException("Not found chat room.");
//        }
//
//        String userToken = jwtUtils.getIdFromToken(request.getToken());
//        if(userToken == null) {
//            throw new RestException("Not found id user from token.");
//        }
//
//        Optional<User> userOptional = userRepository.findById(userToken);
//        if(userOptional.isEmpty()) {
//            throw new RestException("Not found User with id: " + userToken);
//        }
//
//        Message message = new Message();
//        message.setChatRoom(chatRooms.get(0));
//        message.setRead(false);
//        message.setContent(request.getMessage());
//        message.setSender(userOptional.get());
//
//        messageRepository.save(message);
//        messagingTemplate.convertAndSend(Topic.TOPIC_CHAT_PRIVATE + "/" + user1+ "/" + user2,
//                message.getContent());
//    }
//
//    @Override
//    public void chatGroup(ChatMessage message, String groupId) {
//
//    }
//
//    @Override
//    public void notification(String destination, String content) {
//
//    }
//}
