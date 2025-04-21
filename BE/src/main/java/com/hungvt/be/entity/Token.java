package com.hungvt.be.entity;

import com.hungvt.be.entity.base.PrimaryEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "token")
public class Token extends PrimaryEntity {
	
	@Column(unique = true, columnDefinition = "TEXT")
	private String accsessToken;
	
	@Column(unique = true, columnDefinition = "TEXT")
	private String refreshToken;
	
	private Long expried;

}
