package com.hungvt.be.infrastructure.utils;

import com.hungvt.be.infrastructure.common.model.request.PageRequest;
import org.springframework.data.domain.Pageable;

public class Helper {

    public static Pageable createPageable(PageRequest request) {
        return org.springframework.data.domain.PageRequest.of(
                request.getNumber() - 1,
                request.getSize()
        );
    }

}
