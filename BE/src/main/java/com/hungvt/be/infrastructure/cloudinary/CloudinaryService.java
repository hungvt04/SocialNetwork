package com.hungvt.be.infrastructure.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.cloudinary.utils.ObjectUtils;
import com.hungvt.be.infrastructure.exception.RestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public Map<String, String> uploadFile(MultipartFile file) {

        Uploader uploader = cloudinary.uploader();
        Map map = null;
        try {
            map = uploader.upload(file, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RestException("Exception upload file.");
        }
        Map<String, String> response = new HashMap<>();
        response.put("url", map.get("url").toString());
        response.put("publicId", map.get("public_id").toString());
        return response;
    }

    public Map delete(String publicId) {
        try {
            return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RestException("Exception delete image.");
        }
    }

}
