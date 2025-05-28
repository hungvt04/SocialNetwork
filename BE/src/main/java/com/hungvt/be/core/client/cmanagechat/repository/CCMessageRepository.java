package com.hungvt.be.core.client.cmanagechat.repository;

import com.hungvt.be.core.client.cmanagechat.model.request.CGetMessageChatRoomRequest;
import com.hungvt.be.core.client.cmanagechat.model.response.CGetMessageChatRoomResponse;
import com.hungvt.be.repository.MessageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CCMessageRepository extends MessageRepository {

    @Query(value = """
            SELECT
            	m.id,
            	m.sender_id,
            	u.full_name,
            	u.avatar,
            	m.content,
            	m.is_read
            FROM
            	message m
            JOIN `user` u ON
            	m.sender_id = u.id
            WHERE
            	m.chat_room_id = :#{#request.chatRoomId}
            ORDER BY m.updated_at DESC
            """)
    Page<CGetMessageChatRoomResponse> getMessageByChatRoom(Pageable pageable, CGetMessageChatRoomRequest request);

}
