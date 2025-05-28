package com.hungvt.be.core.client.cmanagefriend.controller;

import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetFriendRequestsRequest;
import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetSuggestedPeopleRequest;
import com.hungvt.be.core.client.cmanagefriend.service.CFFriendService;
import com.hungvt.be.infrastructure.constant.MappingUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(MappingUrl.API_FRIEND)
@CrossOrigin("*")
public class CFriendController {

    private final CFFriendService service;

    @GetMapping
    public ResponseEntity<?> getAllFriends() {
        return ResponseEntity.ok("Get all friends");
    }

    @GetMapping("/requests")
    public ResponseEntity<?> getFriendRequests(CFGetFriendRequestsRequest request) {
        return ResponseEntity.ok(service.getFriendRequests(request));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<?> getSuggestedPeople(CFGetSuggestedPeopleRequest request) {
        return ResponseEntity.ok(service.getSuggestedPeople(request));
    }

    @PostMapping("/request-friend/{user2Id}")
    public ResponseEntity<?> postFriend(@PathVariable String user2Id) {
        return ResponseEntity.ok(service.postFriend(user2Id));
    }

    @DeleteMapping("/delete-friend/{userId}")
    public ResponseEntity<?> deleteFriend(@PathVariable String userId) {
        return ResponseEntity.ok(service.deleteFriend(userId));
    }

    @PutMapping("/accept-friend/{user1Id}")
    public ResponseEntity<?> putAcceptFriend(@PathVariable String user1Id) {
        return ResponseEntity.ok(service.putAcceptFriend(user1Id));
    }

    @PutMapping("/reject-friend/{user1Id}")
    public ResponseEntity<?> putRejectFriend(@PathVariable String user1Id) {
        return ResponseEntity.ok(service.putRejectFriend(user1Id));
    }

    @PutMapping("/block-friend/{userId}")
    public ResponseEntity<?> putBlockFriend(@PathVariable String userId) {
        return ResponseEntity.ok(service.putBlockFriend(userId));
    }

}
