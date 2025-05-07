package com.hungvt.be.core.client.cmanagearticle.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hungvt.be.core.client.cmanagearticle.model.request.CPostArticleRequest;
import com.hungvt.be.core.client.cmanagearticle.service.CArticleService;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.constant.MappingUrl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(MappingUrl.API_ARTICLE)
@CrossOrigin("*")
public class CArticleController {
	
	private final CArticleService articleService;
	
	@PostMapping
    public ResponseObject postArticle(@RequestBody CPostArticleRequest request) {
        return articleService.postArticle(request);
    }
	
}
