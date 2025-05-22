package com.hungvt.be.core.client.cmanagefriend.service;

import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetFriendRequest;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;

public interface CFriendService {

    ResponseObject getAllFriends(CFGetFriendRequest request);

    ResponseObject postFriend(String user2Id);

    ResponseObject deleteFriend(String userId);

    ResponseObject postAcceptFriend(String user1Id);

    ResponseObject postRejectFriend(String user1Id);

    ResponseObject postBlockFriend(String userId);

}
