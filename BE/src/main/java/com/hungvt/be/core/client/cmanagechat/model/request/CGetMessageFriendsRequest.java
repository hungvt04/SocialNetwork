package com.hungvt.be.core.client.cmanagechat.model.request;

import com.hungvt.be.infrastructure.common.model.request.PageRequest;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CGetMessageFriendsRequest extends PageRequest {

    @NotBlank(message = "Friends id is required.")
    private String friendsId;

}
