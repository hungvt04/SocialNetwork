package com.hungvt.be.core.client.cmanagefriend.model.request;

import com.hungvt.be.infrastructure.common.model.request.PageRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CFGetFriendRequestsRequest extends PageRequest {

    private String keyword = null;

    private String currentUserId;

}
