package com.hungvt.be.repository;

import com.hungvt.be.entity.Friends;
import com.hungvt.be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendsRepository extends JpaRepository<Friends, String> {

    //    @Query(value = """
//            SELECT f FROM Friends f JOIN User u ON f.user2 = u.id
//            WHERE (f.user1 = :user1)
//            """)
    List<Friends> getFriendsByUser1(User user1);


    List<Friends> findByUser1AndUser2(User user1, User user2);

    @Query(value = """
            SELECT f FROM Friends f JOIN User u ON f.user2.id = u.id
            WHERE (f.user1.id = :user1Id AND f.user2.id = :user2Id) OR (f.user1.id = :user2Id AND f.user2.id = :user1Id)
            """)
    List<Friends> findAllByUser1AndUser2(String user1Id, String user2Id);

//    List<Friends> findByUser1IdAndUser2Id(String user1Id, String user2Id);

}
