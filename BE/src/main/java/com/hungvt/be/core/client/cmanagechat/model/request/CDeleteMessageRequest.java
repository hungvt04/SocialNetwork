package com.hungvt.be.core.client.cmanagechat.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CDeleteMessageRequest {

    @NotBlank(message = "Chat room ID is required.")
    private String chatRoomId;

}
