package com.bluejeans.server.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.EssayFileEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.EssayFileRepository;
import com.bluejeans.server.repository.EssayRepository;
import com.bluejeans.server.service.RecruitService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class RecruitFileUploadController {

    private final AmazonS3Client amazonS3Client;
    @Autowired
    EssayFileRepository essayFileRepository;
    @Autowired
    EssayRepository essayRepository;

    @Autowired
    RecruitService recruitService;


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    //엔티티 받아서 저장하기
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<String> registerRecruit(@RequestParam("file") MultipartFile file,  @ModelAttribute RecruitDTO recruitDTO, @AuthenticationPrincipal UserEntity user) {
        try {
            String fileName=file.getOriginalFilename();
            String fileUrl= "https://" + bucket + "/test" +fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);
            System.out.println(file);
            //여기까지는 s3에 저장해주는 코드

            //내가 파일 엔터티에 저장해주기
            recruitService.registerRecruit(recruitDTO, user, fileUrl);

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
/*
    // 일자리 수정
    @PatchMapping("/{job_id}")
    public boolean editRecruit(@PathVariable int job_id, @RequestBody RecruitDTO recruitDTO){
        return recruitService.editRecruit(job_id, recruitDTO);

        try {
            MultipartFile file = recruitDTO.getImg_path();
            String fileName=file.getOriginalFilename();
            String fileUrl= "https://" + bucket + "/test" +fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);

            //여기까지는 s3에 저장해주는 코드

            //내가 파일 엔터티에 저장해주기
            recruitService.registerRecruit(recruitDTO, user, fileUrl);

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


 */
//    @GetMapping("/{essay_id}")
//    public String getFile(@PathVariable int essay_id){
//        EssayFileEntity essayFile = essayFileRepository.findByEssayId(essay_id).orElse(null);
//        return essayFile.getImg_path();
//
//    }

    // 일자리 등록
//    @PostMapping
//    public boolean registerRecruit(@RequestBody RecruitDTO recruitDTO, @AuthenticationPrincipal UserEntity user){
//        return recruitService.registerRecruit(recruitDTO, user);
//    }
}
