package com.hungvt.be.core.common.managementimage.service;

import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    ResponseObject uploadImage(MultipartFile file);

    ResponseObject deleteImage(String publicId);

}
