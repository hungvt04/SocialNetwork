package com.hungvt.be.core.common.managementimage.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.cloudinary.utils.ObjectUtils;
import com.hungvt.be.core.common.managementimage.repository.CImageTempRepository;
import com.hungvt.be.entity.ImageTemp;
import com.hungvt.be.infrastructure.common.model.response.ResponseObject;
import com.hungvt.be.infrastructure.exception.RestException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;

    private final CImageTempRepository imageTempRepository;

    @Override
    public ResponseObject uploadImage(MultipartFile file) {

        Uploader uploader = cloudinary.uploader();
        Map map;
        try {
            map = uploader.upload(file.getBytes(), ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RestException("Exception upload file.");
        }
        String url = map.get("url").toString();
        String publicId = map.get("public_id").toString();

        ImageTemp imageTemp = new ImageTemp();
        imageTemp.setUrl(url);
        imageTemp.setPublicId(publicId);
        imageTempRepository.save(imageTemp);

        Map<String, String> response = new HashMap<>();
        response.put("url", url);
        response.put("publicId", publicId);
        return ResponseObject.ofData(response);
    }

    @Override
    @Transactional
    public ResponseObject deleteImage(String publicId) {
        try {
            imageTempRepository.deleteByPublicId(publicId);
            return ResponseObject.ofData(cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap()));
        } catch (IOException e) {
            throw new RestException("Exception delete image.");
        }
    }
}
