package com.hungvt.be.core.client.cmanagearticle.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CPostArticleRequest {

    private String content;

    private String status;

    private List<String> hashtags;

    private List<String> members;

    private List<String> images;

}
