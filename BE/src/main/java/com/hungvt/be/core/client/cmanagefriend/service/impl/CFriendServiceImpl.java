package com.hungvt.be.core.client.cmanagefriend.service.impl;

import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetFriendRequest;
import com.hungvt.be.core.client.cmanagefriend.repository.CFFriendsRepository;
import com.hungvt.be.core.client.cmanagefriend.repository.CFUserRepository;
import com.hungvt.be.core.client.cmanagefriend.service.CFriendService;
import com.hungvt.be.entity.Friends;
import com.hungvt.be.entity.User;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.constant.FriendStatus;
import com.hungvt.be.infrastructure.constant.Topic;
import com.hungvt.be.infrastructure.exception.RestException;
import com.hungvt.be.infrastructure.utils.VariablesGlobal;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CFriendServiceImpl implements CFriendService {

    private final CFFriendsRepository friendsRepository;

    private final CFUserRepository userRepository;

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public ResponseObject getAllFriends(CFGetFriendRequest request) {
        return null;
    }

    private User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RestException("User not found with id: " + userId));
    }

    @Override
    public ResponseObject postFriend(String user2Id) {

        User user1 = VariablesGlobal.USER;
        User user2 = this.getUserById(user2Id);
        List<Friends> friendsList = friendsRepository.findByUser1AndUser2(user1, user2);
        if (!friendsList.isEmpty()) {
            throw new RestException("Friend request already exists");
        }

        Friends friends = new Friends();
        friends.setUser1(user1);
        friends.setUser2(user2);
        friends.setFriendStatus(FriendStatus.PENDING);
        friendsRepository.save(friends);
        messagingTemplate.convertAndSend(Topic.TOPIC_NOTIFICATION + "/" + user2Id,
                "Bạn nhận được lời mời kết bạn mới.");

        return ResponseObject.ofData(null, "Friend request sent successfully!!!");
    }

    @Override
    public ResponseObject deleteFriend(String userId) {

        User user1 = VariablesGlobal.USER;
        User user2 = this.getUserById(userId);
        List<Friends> friendsList = friendsRepository.findByUser1AndUser2(user1, user2);
        if (friendsList.isEmpty()) {
            throw new RestException("You cannot unfriend this user because you are not friends yet!!!");
        }

        friendsRepository.deleteAll(friendsList);
        return ResponseObject.ofData(null);
    }

    @Override
    public ResponseObject postAcceptFriend(String user1Id) {

        User user1 = this.getUserById(user1Id);
        User user2 = VariablesGlobal.USER;
        List<Friends> friendsList = friendsRepository.findByUser1AndUser2(user1, user2);
        if (friendsList.isEmpty()) {
            throw new RestException("Friend request not found. You can only accept or reject an existing friend request!!!");
        }
        Friends friends = friendsList.get(0);
        friends.setFriendStatus(FriendStatus.ACCEPTED);
        friendsRepository.save(friends);
        return ResponseObject.ofData(null, "You are now friends!!!");
    }

    @Override
    public ResponseObject postRejectFriend(String user1Id) {

        User user1 = this.getUserById(user1Id);
        User user2 = VariablesGlobal.USER;
        List<Friends> friendsList = friendsRepository.findByUser1AndUser2(user1, user2);
        if (friendsList.isEmpty()) {
            throw new RestException("Friend request not found. You can only accept or reject an existing friend request!!!");
        }
        Friends friends = friendsList.get(0);
        friends.setFriendStatus(FriendStatus.REJECTED);
        friendsRepository.save(friends);
        return ResponseObject.ofData(null, "You have declined the friend request!!!");
    }

    @Override
    public ResponseObject postBlockFriend(String userId) {

        User user1 = this.getUserById(userId);
        User user2 = VariablesGlobal.USER;
        List<Friends> friendsList = friendsRepository.findByUser1AndUser2(user1, user2);
        if (friendsList.isEmpty()) {
            throw new RestException("Friend request not found. You can only accept or reject an existing friend request!!!");
        }
        Friends friends = friendsList.get(0);
        friends.setFriendStatus(FriendStatus.REJECTED);
        friendsRepository.save(friends);
        return ResponseObject.ofData(null, "You have declined the friend request!!!");
    }
}
