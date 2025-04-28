package com.hungvt.be.core.common.managementimage.controller;

import com.hungvt.be.core.common.managementimage.service.ImageService;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.constant.MappingUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping(MappingUrl.API_COMMON_IMAGE)
public class ImageController {

    private final ImageService imageService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseObject uploadImage(@RequestParam("file") MultipartFile file) {
        return imageService.uploadImage(file);
    }

    @PostMapping("/delete/{publicId}")
    public ResponseObject deleteImage(@PathVariable String publicId) {
        return imageService.deleteImage(publicId);
    }

}
