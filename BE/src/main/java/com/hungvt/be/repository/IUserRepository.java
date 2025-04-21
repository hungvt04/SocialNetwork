package com.hungvt.be.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hungvt.be.entity.User;

@Repository
public interface IUserRepository extends JpaRepository<User, String> {
	
	Optional<User> findByUsername(String username);
	
	Optional<User> findByEmail(String email);

}
