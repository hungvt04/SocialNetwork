package com.hungvt.be.repository;

import com.hungvt.be.entity.UserReactTemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserReactTempRepository extends JpaRepository<UserReactTemp, String> {
}
