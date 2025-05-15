package com.hungvt.be.core.client.cmanagefriend.controller;

import com.hungvt.be.infrastructure.constant.MappingUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(MappingUrl.API_FRIEND)
@CrossOrigin("*")
public class CFriendController {

    @GetMapping
    public ResponseEntity<?> getAllFriends() {
        return ResponseEntity.ok("Get all friends");
    }

}
