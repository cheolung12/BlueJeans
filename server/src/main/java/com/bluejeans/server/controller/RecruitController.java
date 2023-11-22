package com.bluejeans.server.controller;

import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class RecruitController {
    @Autowired
    private RecruitService recruitService;
/*
    // 모든 공고 불러오기
    @GetMapping
    public List<RecruitDTO> findAll() {
        return recruitService.findAll();
    }

    //집 근처
    @GetMapping("/searchRegion")
    public List<RecruitDTO> findByRegion(@RequestParam String region) {
        return recruitService.findByRegion(region);
    }

    // 최신순, 인기순 필터링
    @GetMapping("/filter")
    public List<RecruitDTO> filteringRecruit(@RequestParam String order) {
        return recruitService.filteringRecruit(order);
    }

    // 검색어 조회
    @GetMapping("/searchKeyword")
    public List<RecruitDTO> searchByKeyword(@RequestParam String keyword) {
        return recruitService.searchByKeyword(keyword);
    }

//    // 일자리 등록
//    @PostMapping
//    public boolean registerRecruit(@RequestBody RecruitDTO recruitDTO, @AuthenticationPrincipal UserEntity user){
//        return recruitService.registerRecruit(recruitDTO, user);
//    }

    // 일자리 상세
    @GetMapping("/{job_id}")
    public ResRecruitDTO recruitDetail(@PathVariable int job_id){
        return recruitService.recruitDetail(job_id);
    }

//    // 일자리 수정
//    @PatchMapping("/{job_id}")
//    public boolean editRecruit(@PathVariable int job_id, @RequestBody RecruitDTO recruitDTO){
//        return recruitService.editRecruit(job_id, recruitDTO);
//    }

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
    public List<RecruitDTO> myLikeRecruit(@AuthenticationPrincipal UserEntity user) {
        return recruitService.myLikeRecruit(user);
    }

 */
}


