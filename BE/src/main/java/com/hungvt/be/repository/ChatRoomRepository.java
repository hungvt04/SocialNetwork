package com.hungvt.be.repository;

import com.hungvt.be.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {

    @Query(value = """
            SELECT c FROM ChatRoom c WHERE 
            (c.user1.id = :user1 AND c.user2.id = :user2) 
            OR c.user1.id = :user2 AND c.user2.id = :user1
            """)
    List<ChatRoom> findByUser1AndUser2(String user1, String user2);
}
