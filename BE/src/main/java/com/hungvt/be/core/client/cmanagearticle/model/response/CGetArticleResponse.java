package com.hungvt.be.core.client.cmanagearticle.model.response;

import java.util.List;

public interface CGetArticleResponse {

    String getArticleId();

    String getUserId();

    String getUserName();

    String getFullName();

    String getContent();

    List<String> getImages();

    List<String> getHashtags();

    List<String> getMembers();

    String getCreatedAt();

    String getUpdatedAt();

    String getStatus();
}
