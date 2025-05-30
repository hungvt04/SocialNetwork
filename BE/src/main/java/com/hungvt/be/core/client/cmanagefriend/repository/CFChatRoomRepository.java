//package com.hungvt.be.core.client.cmanagefriend.repository;
//
//import com.hungvt.be.entity.ChatRoom;
//import com.hungvt.be.repository.ChatRoomRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface CFChatRoomRepository extends ChatRoomRepository {
//
//    @Query(value = """
//            SELECT cr FROM ChatRoom cr WHERE cr.user1.id = :user1Id AND cr.user2.id = :user2Id
//            """)
//    List<ChatRoom> findChatRoomByUser(String user1Id, String user2Id);
//
//}
