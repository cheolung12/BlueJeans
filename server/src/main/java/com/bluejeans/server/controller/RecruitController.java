package com.bluejeans.server.controller;

import com.bluejeans.server.dto.DibResultDTO;
import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.DibResult;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.RecruitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@Tag(name="일자리 API", description="노인 일자리 관련 공고 API 입니다.")
public class RecruitController {
    @Autowired
    private RecruitService recruitService;


    // 일자리 등록 (오류)
    @PostMapping(consumes = "multipart/form-data")
    @Operation(summary="공고 게시물 등록")
    public boolean registerRecruit(@RequestParam("file") MultipartFile multipartFile, @ModelAttribute RecruitDTO recruitDTO, @AuthenticationPrincipal UserEntity user) throws IOException {
        return recruitService.registerRecruit(recruitDTO,user, multipartFile);
    }

    @GetMapping
    @Operation(summary="모든 공고 불러오기")
    public List<ResRecruitDTO> findAll() {
        return recruitService.findAll();
    }

    @GetMapping("/searchRegion")
    @Operation(summary="지역별 공고 검색")
    @Parameter(name = "region", description = "xx시 xx구")
    public List<ResRecruitDTO> findByRegion(@RequestParam String region) {
        return recruitService.findByRegion(region);
    }

    @GetMapping("/filter")
    @Operation(summary="최신순, 인기순 필터링")
    @Parameter(name = "order", description = "favorite or latest")
    public List<ResRecruitDTO> filteringRecruit(@RequestParam String order) {
        return recruitService.filteringRecruit(order);
    }

    @GetMapping("/searchKeyword")
    @Operation(summary="검색어로 공고 조회")
    @Parameter(name = "keyword", description = "사용자 입력 검색어")
    public List<ResRecruitDTO> searchByKeyword(@RequestParam String keyword) {
        return recruitService.searchByKeyword(keyword);
    }

    @GetMapping("/{job_id}")
    @Operation(summary="공고 게시물 상세 조회")
    public ResRecruitDTO recruitDetail(@PathVariable int job_id){
        return recruitService.recruitDetail(job_id);
    }

    // 일자리 수정 (오류)
    @PatchMapping("/{job_id}")
    @Operation(summary="공고 게시물 수정")
    public boolean editRecruit(@PathVariable int job_id, @RequestParam("file") MultipartFile multipartFile, @ModelAttribute RecruitDTO recruitDTO) throws IOException {
        return recruitService.editRecruit(job_id, recruitDTO, multipartFile);
    }

    @DeleteMapping("/{job_id}")
    @Operation(summary="공고 게시물 삭제")
    public boolean deleteRecruit(@PathVariable int job_id){
        return recruitService.deleteRecruit(job_id);
    }

    @PostMapping("/like/{job_id}")
    @Operation(summary="공고 찜하기")
    public DibResultDTO recruitDib(@PathVariable int job_id, @AuthenticationPrincipal UserEntity user){
        DibResult dibResult = recruitService.dib(job_id, user);
        long counts = recruitService.countDibs(job_id);

        return new DibResultDTO(counts, dibResult);
    }
}


