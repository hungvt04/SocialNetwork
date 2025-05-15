package com.hungvt.be.core.client.cmanagefriend.model.request;

import com.hungvt.be.infrastructure.common.model.request.PageRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CFGetFriendRequest extends PageRequest {

    private String keyword;

}
