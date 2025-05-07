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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final Cloudinary cloudinary;

    private final CImageTempRepository imageTempRepository;
    
    private ImageTemp upload(MultipartFile file) {
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
        return imageTempRepository.save(imageTemp);
    }

    @Override
    public ResponseObject uploadImage(MultipartFile file) {

    	ImageTemp imageTemp = this.upload(file);

        Map<String, String> response = new HashMap<>();
        response.put("url", imageTemp.getUrl());
        response.put("publicId", imageTemp.getPublicId());
        return ResponseObject.ofData(response);
    }

	@Override
	public ResponseObject uploadImages(List<MultipartFile> files) {

		Map<String, Object> response = new HashMap<>();
		List<String> urls = new ArrayList<String>();
		List<String> publicIds = new ArrayList<String>();
		for (MultipartFile file : files) {
			ImageTemp imageTemp = this.upload(file);
			urls.add(imageTemp.getUrl());
			publicIds.add(imageTemp.getPublicId());
		}
		response.put("urls", urls);
        response.put("publicIds", publicIds);
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
