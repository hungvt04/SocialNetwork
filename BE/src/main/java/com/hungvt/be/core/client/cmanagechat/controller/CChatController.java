package com.hungvt.be.core.client.cmanagechat.controller;

import com.hungvt.be.core.client.cmanagechat.model.request.CDeleteMessageRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CGetMessageFriendsRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CPostMessageRequest;
import com.hungvt.be.core.client.cmanagechat.model.request.CPutMessageRequest;
import com.hungvt.be.core.client.cmanagechat.service.CChatService;
import com.hungvt.be.infrastructure.constant.MappingUrl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(MappingUrl.API_CHAT)
@CrossOrigin("*")
public class CChatController {

    private final CChatService service;

    @GetMapping
    public ResponseEntity<?> getMessageFriends(CGetMessageFriendsRequest request) {
        System.out.println(request);
        return ResponseEntity.ok(service.getMessageFriends(request));
    }

    @PostMapping
    public ResponseEntity<?> postMessage(@Valid @RequestBody CPostMessageRequest request){
        return ResponseEntity.ok(service.postMessage(request));
    }

    @PutMapping("/{messageId}")
    public ResponseEntity<?> putMessage(@PathVariable String messageId,
                                         @Valid @RequestBody CPutMessageRequest request) {
        return ResponseEntity.ok(service.putMessage(messageId, request));
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<?> deleteMessage(@PathVariable String messageId,
                                         @Valid @RequestBody CDeleteMessageRequest request) {
        return ResponseEntity.ok(service.deleteMessage(messageId, request));
    }

}
