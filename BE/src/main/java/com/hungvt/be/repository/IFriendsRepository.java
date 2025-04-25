package com.hungvt.be.repository;

import com.hungvt.be.entity.Friends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFriendsRepository extends JpaRepository<Friends, String> {
}
