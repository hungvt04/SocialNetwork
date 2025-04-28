package com.hungvt.be.core.client.cmanagearticle.model.request;

import com.hungvt.be.infrastructure.common.model.request.PageRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CGetArticleRequest extends PageRequest {

    private String keyword;

}
