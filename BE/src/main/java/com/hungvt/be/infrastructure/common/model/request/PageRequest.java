package com.hungvt.be.infrastructure.common.model.request;

import com.hungvt.be.infrastructure.constant.PageConstant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class PageRequest {

    private Integer number = PageConstant.PAGE_NUMBER;

    private Integer size = PageConstant.PAGE_SIZE;

}
