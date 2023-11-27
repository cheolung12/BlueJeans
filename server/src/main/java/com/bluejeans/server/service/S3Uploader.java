package com.bluejeans.server.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
@Service
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    //multipartfile을 file로 전환후 s3에 업로드
    public String upload(MultipartFile multipartFile, String dirName) throws IOException{
        if(multipartFile.getSize() <= 0) {
            new IllegalArgumentException("업로드될 파일이 없습니다.");
        }

        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("multipartfile -> file전환 실패"));
        return upload(uploadFile, dirName);
    }

    private String upload(File uploadFile, String dirName){
        //이름중복되면 업로드 안됨 timestamp+이름 으로 저장
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String timestampString = dateFormat.format(new Date(timestamp.getTime()));

        String fileName = dirName +"/" +timestampString+ uploadFile.getName() ;
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile); //로컬에 생성된 File 삭제(multipartFile -> File 전환할때 로컬에 파일 생성)

        return uploadImageUrl; //업로드된 파일의 S3 URL 주소 반환
    }

    //s3에 파일을 업로드 하고 파일 url 반환
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if(targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        }else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    //멀티파트파일 -> 파일로 변환 메소드
    private Optional<File> convert(MultipartFile multipartFile) throws IOException{
        File convertFile = new File(multipartFile.getOriginalFilename()); //원래파일이름으로 새 file생성
        if(convertFile.createNewFile()){
            try(FileOutputStream fos = new FileOutputStream(convertFile)){
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(convertFile); //파일 변환 성공시 convertFile반환
        }
        return Optional.empty(); //실패시 빈 Optional반환
    }
}
