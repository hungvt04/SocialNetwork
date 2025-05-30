package com.hungvt.be.core.client.cmanagechat.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CPutMessageRequest {

    @NotBlank(message = "Friends id is required.")
    private String friendsId;

    @NotBlank(message = "Message content must not be empty.")
    @Size(max = 1000, message = "Message content must not exceed 1000 characters.")
    private String content;

}
