package com.hungvt.be.entity;

import java.util.List;

import com.hungvt.be.constant.Role;
import com.hungvt.be.entity.base.PrimaryEntity;

import jakarta.persistence.Entity;
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
@Table(name = "user")
public class User extends PrimaryEntity {

	private String username;
	
	private String email;
	
	private String fullname;
	
	private String password;
	
	private String avatar;
	
	private List<Role> roles;
	
}
