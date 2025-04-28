package com.hungvt.be.repository;

import com.hungvt.be.entity.HashtagTemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HashtagTempRepository extends JpaRepository<HashtagTemp, String> {
}
