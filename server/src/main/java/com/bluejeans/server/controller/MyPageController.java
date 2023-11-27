package com.bluejeans.server.controller;

import com.bluejeans.server.dto.EditUserInfoDTO;
import com.bluejeans.server.dto.ResMainDTO;
import com.bluejeans.server.dto.ResMyPageDTO;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.MyPageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name="마이페이지 API", description="마이페이지 관련 API 입니다.")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @GetMapping("/api/mypage")
    @Operation(summary="유저 정보, 해당 유저가 찜한 게시물 불러오기")
    public ResMyPageDTO getUserInfo(@AuthenticationPrincipal UserEntity user) {

        return myPageService.getUserInfo(user);
    }

    @PatchMapping("/api/mypage")
    @Operation(summary = "사용자 정보 수정")
    public boolean editUserInfo(@AuthenticationPrincipal UserEntity user, @RequestBody EditUserInfoDTO editDTO) {

        return myPageService.editUserInfo(user, editDTO);
    }

    @GetMapping("api/main")
    @Operation(summary="main 화면에서 게시물 정보 불러오기")
    public ResMainDTO getMainPost() {

        return myPageService.getMainPost();
    }

}
