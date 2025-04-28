package com.hungvt.be.repository;

import com.hungvt.be.entity.ImageTemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageTempRepository extends JpaRepository<ImageTemp, String> {

    List<ImageTemp> findByUrl(String url);

    void deleteByPublicId(String publicId);

}
