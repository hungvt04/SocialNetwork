package com.hungvt.be.core.client.cmanagearticle.service;

import com.hungvt.be.core.client.cmanagearticle.model.request.CPostArticleRequest;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;

public interface CArticleService {

    ResponseObject getAllArticles();

    ResponseObject postArticle(CPostArticleRequest request);

    ResponseObject reactArticle(String articleId, String type);

    ResponseObject deleteReactArticle(String articleId);

}
