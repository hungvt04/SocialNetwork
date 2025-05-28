package com.hungvt.be.core.client.cmanagefriend.service;

import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetFriendRequest;
import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetFriendRequestsRequest;
import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetSuggestedPeopleRequest;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;

public interface CFFriendService {

    ResponseObject getAllFriends(CFGetFriendRequest request);

    ResponseObject getSuggestedPeople(CFGetSuggestedPeopleRequest request);

    ResponseObject getFriendRequests(CFGetFriendRequestsRequest request);

    ResponseObject postFriend(String user2Id);

    ResponseObject deleteFriend(String userId);

    ResponseObject putAcceptFriend(String user1Id);

    ResponseObject putRejectFriend(String user1Id);

    ResponseObject putBlockFriend(String userId);

}
