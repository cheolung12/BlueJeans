package com.bluejeans.server.controller;

import com.bluejeans.server.dto.EditUserInfoDTO;
import com.bluejeans.server.dto.MyPageDTO;
import com.bluejeans.server.dto.UserDTO;
import com.bluejeans.server.entity.UserEntity;
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
@RequestMapping("/api/mypage")
@Tag(name="마이페이지 API", description="마이페이지 관련 API 입니다.")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @Autowired
    S3Uploader s3Uploader;

    @GetMapping
    @Operation(summary="유저 정보, 해당 유저가 찜한 게시물 불러오기")
    public MyPageDTO getUserInfo(@AuthenticationPrincipal UserEntity user) {

        return myPageService.getUserInfo(user);
    }

    @PatchMapping
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
}
