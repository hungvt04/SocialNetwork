package com.hungvt.be.core.client.cmanagechat.repository;

import com.hungvt.be.core.client.cmanagechat.model.request.CGetMessageFriendsRequest;
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
            	m.id AS message_id,
            	m.sender_id,
            	u.avatar AS sender_avatar,
            	u.full_name,
            	m.content,
            	m.is_read,
            	m.created_at,
            	m.updated_at,
            	m.is_deleted
            FROM
            	message m
            JOIN `user` u ON
            	m.sender_id = u.id
            WHERE
            	m.friends_id = :#{#request.friendsId}
            ORDER BY m.updated_at DESC
            """, nativeQuery = true)
    Page<CGetMessageChatRoomResponse> getMessageByFriends(Pageable pageable, CGetMessageFriendsRequest request);

//    @Query(value = """
//            SELECT m FROM Message m JOIN User u ON
//            	m.sender.id = u.id
//            WHERE m.friends.id = :#{#request.friendsId} ORDER BY m.updatedAt DESC
//            """)
//    Page<Message> getMessageByFriends(Pageable pageable, CGetMessageFriendsRequest request);

}
