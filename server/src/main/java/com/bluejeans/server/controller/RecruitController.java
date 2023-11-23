package com.bluejeans.server.controller;

import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class RecruitController {
    @Autowired
    private RecruitService recruitService;


    // 일자리 등록
    @PostMapping(consumes = "multipart/form-data")
    public boolean registerRecruit(@RequestParam("file") MultipartFile multipartFile, @ModelAttribute RecruitDTO recruitDTO, @AuthenticationPrincipal UserEntity user) throws IOException {

        return recruitService.registerRecruit(recruitDTO,user, multipartFile);
    }

    // 모든 공고 불러오기
    @GetMapping
    public List<ResRecruitDTO> findAll() {
        return recruitService.findAll();
    }

    //집 근처
    @GetMapping("/searchRegion")
    public List<ResRecruitDTO> findByRegion(@RequestParam String region) {
        return recruitService.findByRegion(region);
    }

    // 최신순, 인기순 필터링
    @GetMapping("/filter")
    public List<ResRecruitDTO> filteringRecruit(@RequestParam String order) {
        return recruitService.filteringRecruit(order);
    }

    // 검색어 조회
    @GetMapping("/searchKeyword")
    public List<ResRecruitDTO> searchByKeyword(@RequestParam String keyword) {
        return recruitService.searchByKeyword(keyword);
    }



    // 일자리 상세
    @GetMapping("/{job_id}")
    public ResRecruitDTO recruitDetail(@PathVariable int job_id){
        return recruitService.recruitDetail(job_id);
    }

    // 일자리 수정
    @PatchMapping("/{job_id}")
    public boolean editRecruit(@PathVariable int job_id, @RequestParam("file") MultipartFile multipartFile, @ModelAttribute RecruitDTO recruitDTO) throws IOException {
        return recruitService.editRecruit(job_id, recruitDTO, multipartFile);
    }

    // 일자리 삭제
    @DeleteMapping("/{job_id}")
    public boolean deleteRecruit(@PathVariable int job_id){
        return recruitService.deleteRecruit(job_id);
    }

    // 좋아요 누름 or 취소
    @PostMapping("/like/{job_id}")
    public boolean likeClick(@PathVariable int job_id, @AuthenticationPrincipal UserEntity user){
        return recruitService.likeClick(job_id, user);
    }

    // 내가 좋아요한 공고
    @GetMapping("/like")
    public List<ResRecruitDTO> myLikeRecruit(@AuthenticationPrincipal UserEntity user) {
        return recruitService.myLikeRecruit(user);
    }


}


