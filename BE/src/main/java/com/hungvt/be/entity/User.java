package com.hungvt.be.entity;

import com.hungvt.be.entity.base.PrimaryEntity;
import com.hungvt.be.infrastructure.constant.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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

    private String phoneNumber;

    private String fullName;

    private String gender;

    private String password;

    private String avatar;

    private List<Role> roles;

}
