package com.bluejeans.server.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.bluejeans.server.dto.EssayDTO;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.EssayFileEntity;
import com.bluejeans.server.repository.EssayFileRepository;
import com.bluejeans.server.repository.EssayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class FileUploadController {

    private final AmazonS3Client amazonS3Client;
    @Autowired
    EssayFileRepository essayFileRepository;
    @Autowired
    EssayRepository essayRepository;


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("/{essay_id}")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable  int essay_id) {
        try {
            String fileName=file.getOriginalFilename();
            String fileUrl= "https://" + bucket + "/test" +fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);
            //여기까지는 s3에 저장해주는 코드

            //내가 파일 엔터티에 저장해주기
            EssayFileEntity essayFile = new EssayFileEntity();
            EssayEntity essay =essayRepository.findById(essay_id).orElse(null);
            essayFile.setEssay(essay);
            essayFile.setImg_path(fileUrl);
            essayFileRepository.save(essayFile); // 저장

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    //엔티티 받아서 저장하기
    @PostMapping("/2")
    public ResponseEntity<String> uploadFile2(@RequestParam("file") MultipartFile file, @RequestBody EssayEntity essay) {
        try {
            String fileName=file.getOriginalFilename();
            String fileUrl= "https://" + bucket + "/test" +fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);
            //여기까지는 s3에 저장해주는 코드

            //내가 파일 엔터티에 저장해주기
            EssayFileEntity essayFile = new EssayFileEntity();
            essayFile.setEssay(essay);
            essayFile.setImg_path(fileUrl);
            essayFileRepository.save(essayFile); // 저장

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{essay_id}")
    public String getFile(@PathVariable int essay_id){
        EssayFileEntity essayFile = essayFileRepository.findByEssayId(essay_id).orElse(null);
        return essayFile.getImg_path();

    }
}
