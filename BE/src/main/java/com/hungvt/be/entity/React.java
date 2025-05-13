package com.hungvt.be.entity;

import com.hungvt.be.entity.base.PrimaryEntity;

import com.hungvt.be.infrastructure.constant.ReactionType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "react")
public class React extends PrimaryEntity {

	@Enumerated(EnumType.STRING)
	private ReactionType type;
	
	private String icon;

}
