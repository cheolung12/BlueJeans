package com.bluejeans.server.controller;

import com.bluejeans.server.dto.DibResultDTO;
import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.DibResult;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.RecruitService;
import com.bluejeans.server.service.S3Uploader;
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

    @Autowired
    S3Uploader s3Uploader;

    @PostMapping(consumes = "multipart/form-data")
    @Operation(summary="공고 게시물 등록")
    public boolean registerRecruit(@RequestParam("file") MultipartFile multipartFile, @ModelAttribute RecruitDTO recruitDTO, @AuthenticationPrincipal UserEntity user) {
        String fileURL = null;
        try {
            fileURL = s3Uploader.upload(multipartFile, "jobs");
        } catch (IOException e) {
            // throw new RuntimeException(e);
            fileURL = null;
        }

        return recruitService.registerRecruit(recruitDTO,user, fileURL);
    }


    @GetMapping
    @Operation(summary="공고 게시물 검색 및 필터링", description = "게시물을 검색어로 조회하고 기준에 맞춰 필터링")
    @Parameter(name="search", description = "사용자에게 입력 받은 검색 키워드입니다. 제목을 기준으로 검색합니다.")
    @Parameter(name="sort", description="정렬 기준으로 'latest', 'likes'가 있습니다.")
    public List<ResRecruitDTO> getJobs(
            @RequestParam(name = "search", required = false) String searchKeyword,
            @RequestParam(name = "sort", required = false) String sortType) {

        if (searchKeyword != null && !searchKeyword.isEmpty()) {
            // 검색 키워드가 있는 경우
            if ("latest".equals(sortType) || sortType == null) {
                // 키워드로 검색하고 최신순으로 정렬
                return recruitService.searchByKeywordAndOrderByLatest(searchKeyword);
            } else if ("likes".equals(sortType)) {
                // 키워드로 검색하고 좋아요순으로 정렬
                return recruitService.searchByKeywordAndOrderByLikes(searchKeyword);
            }
        } else {
            // 검색 키워드가 없는 경우
            if ("latest".equals(sortType) || sortType == null) {
                // 모든 게시물을 최신순으로 정렬
                return  recruitService.orderByType("latest");
            } else if ("likes".equals(sortType)) {
                // 모든 게시물을 좋아요순으로 정렬
                return  recruitService.orderByType("likes");
            }
        }
        return recruitService.findAll();
    }

    @GetMapping("/{job_id}")
    @Operation(summary="공고 게시물 상세 조회")
    public ResRecruitDTO recruitDetail(@PathVariable int job_id){
        return recruitService.recruitDetail(job_id);
    }

    // 일자리 수정 (오류)
    @PatchMapping("/{job_id}")
    @Operation(summary="공고 게시물 수정")
    public boolean editRecruit(@PathVariable int job_id, @RequestParam("file") MultipartFile multipartFile, @ModelAttribute RecruitDTO recruitDTO)  {
        String fileURL = null;
        try {
            fileURL = s3Uploader.upload(multipartFile, "jobs");
        } catch (IOException e) {
//                throw new RuntimeException(e);
            fileURL = null;
        }
        return recruitService.editRecruit(job_id, recruitDTO, fileURL);
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

    @PostMapping("/recruiting/{job_id}")
    @Operation(summary="마감 여부 표시")
    public String toggleRecruiting(@PathVariable int job_id) {
        boolean result = recruitService.updateRecruiting(job_id);

        return "변경된 상태: " + result;
    }
}


