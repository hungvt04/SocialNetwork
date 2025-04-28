package com.hungvt.be.repository;

import com.hungvt.be.entity.TagTemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagTempRepository extends JpaRepository<TagTemp, String> {
}
