package com.hungvt.be.core.client.cmanagearticle.model.request;

import com.hungvt.be.infrastructure.annotation.ValidReactionType;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CPostReactArticleRequest {

	@NotBlank(message = "Id bài viết không được để trống!!!")
	private String articleId;
	
	@ValidReactionType
	private String type;
	
}
