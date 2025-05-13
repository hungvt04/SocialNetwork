package com.hungvt.be.core.client.cmanagearticle.model.response;

public interface CGetArticleResponse {

    String getArticleId();
    
    String getAuthorId();
    
    String getAuthorName();
    
    Long getCreatedAt();

    String getContent();

    String getUrls();
    
    Integer getTotalReact();

    String getReact();
    
}
