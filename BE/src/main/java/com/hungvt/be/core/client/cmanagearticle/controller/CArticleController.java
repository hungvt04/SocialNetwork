package com.hungvt.be.core.client.cmanagearticle.controller;

import com.hungvt.be.core.client.cmanagearticle.model.request.CPostArticleRequest;
import com.hungvt.be.core.client.cmanagearticle.service.CArticleService;
import com.hungvt.be.infrastructure.constant.MappingUrl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(MappingUrl.API_ARTICLE)
@CrossOrigin("*")
public class CArticleController {

    private final CArticleService articleService;

    @PostMapping
    public ResponseEntity<?> postArticle(@Valid @RequestBody CPostArticleRequest request) {
        return ResponseEntity.ok(articleService.postArticle(request));
    }

    @GetMapping
    public ResponseEntity<?> getArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @PostMapping("/react/{articleId}")
    public ResponseEntity<?> reactArticle(@PathVariable String articleId,
                                          @RequestBody Map<String, String> body) {
        String type = body.get("type");
        return ResponseEntity.ok(articleService.reactArticle(articleId, type));
    }

    @DeleteMapping("/delete/{articleId}")
    public ResponseEntity<?> deleteReactArticle(@PathVariable String articleId) {
        return ResponseEntity.ok(articleService.deleteReactArticle(articleId));
    }

}
