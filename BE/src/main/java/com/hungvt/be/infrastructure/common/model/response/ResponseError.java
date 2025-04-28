package com.hungvt.be.infrastructure.common.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseError {

    private String message;

    private String detailMessage;

    private Map<String, String> errors;

    private int code;

    private String moreInformation;

}
