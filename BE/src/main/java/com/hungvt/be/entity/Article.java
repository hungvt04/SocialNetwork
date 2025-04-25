package com.hungvt.be.entity;

import com.hungvt.be.entity.base.PrimaryEntity;
import com.hungvt.be.infrastructure.constant.ArticleStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "article")
public class Article extends PrimaryEntity {

    private String content;

    private Integer totalReact;

    @Enumerated(EnumType.STRING)
    private ArticleStatus status;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @ManyToOne
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private User member;

}
