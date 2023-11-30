package com.bluejeans.server.controller;

import com.bluejeans.server.dto.EditUserInfoDTO;
import com.bluejeans.server.dto.ResMainDTO;
import com.bluejeans.server.dto.ResMyPageDTO;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.MainPageService;
import com.bluejeans.server.service.MyPageService;
import com.bluejeans.server.service.S3Uploader;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@Tag(name="마이페이지 API", description="마이페이지 관련 API 입니다.")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @Autowired
    private MainPageService mainPageService;


    @Autowired
    S3Uploader s3Uploader;


    @GetMapping("/api/mypage")
    @Operation(summary="유저 정보, 해당 유저가 찜한 게시물 불러오기")
    public ResMyPageDTO getUserInfo(@AuthenticationPrincipal UserEntity user) {

        return myPageService.getUserInfo(user);
    }

    @PatchMapping("/api/mypage")
    @Operation(summary = "사용자 정보 수정")
    public boolean editUserInfo(@RequestParam(name = "file", required = false) MultipartFile multipartFile, @AuthenticationPrincipal UserEntity user, @ModelAttribute EditUserInfoDTO editDTO) {
        String fileURL = null;
        try {
            fileURL = s3Uploader.upload(multipartFile, "user");
        } catch (IOException e) {
//                throw new RuntimeException(e);
            fileURL = null;
        }


        return myPageService.editUserInfo(fileURL, user, editDTO);
    }

    // 하나밖에 없어서 여기다 만들었음
    @GetMapping("/api/main")
    @Operation(summary="main 화면에서 게시물 정보 불러오기")
    public ResMainDTO getMainPost() {

        return mainPageService.getMainPost();
    }

}
