package com.hungvt.be.core.client.cmanagearticle.model.response;

import java.util.List;

public interface CGetArticleResponse {

    String getArticleId();
    
    String getAuthorId();
    
    String getAuthorName();
    
    Long getCreatedAt();

    String getContent();

    String getUrls();
    
    Integer getTotalReact();
    

    String getUserId();

    String getUserName();

    String getFullName();

    List<String> getImages();

    List<String> getHashtags();

    List<String> getMembers();

    String getUpdatedAt();

    String getStatus();
    
}
