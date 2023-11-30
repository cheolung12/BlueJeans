package com.bluejeans.server.controller;

import com.bluejeans.server.dto.DibResultDTO;
import com.bluejeans.server.dto.ResEBookContentDTO;
import com.bluejeans.server.dto.ResEBookDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.DibResult;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.EBookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name="EBook API", description = "EBook 관련 API 입니다.")
@RequestMapping("/api/ebook")
public class EBookController {

    @Autowired
    private EBookService eBookService;

    @GetMapping
    @Operation(summary="이북 게시물 검색 및 필터링", description = "게시물을 검색어로 조회하고 기준에 맞춰 필터링")
    @Parameter(name="search", description = "사용자에게 입력 받은 검색 키워드입니다. 책 제목을 기준으로 검색합니다.")
    @Parameter(name="sort", description="정렬 기준으로 'latest', 'likes'가 있습니다.")
    public List<ResEBookDTO> getJobs(
            @RequestParam(name = "search", required = false) String searchKeyword,
            @RequestParam(name = "sort", required = false) String sortType) {

        if (searchKeyword != null && !searchKeyword.isEmpty()) {
            // 검색 키워드가 있는 경우
            if ("latest".equals(sortType) || sortType == null) {
                // 키워드로 검색하고 최신순으로 정렬
                return eBookService.searchByKeywordAndOrderByLatest(searchKeyword);
            } else if ("likes".equals(sortType)) {
                // 키워드로 검색하고 좋아요순으로 정렬
                return eBookService.searchByKeywordAndOrderByLikes(searchKeyword);
            }
        } else {
            // 검색 키워드가 없는 경우
            if ("latest".equals(sortType) || sortType == null) {
                // 모든 게시물을 최신순으로 정렬
                return  eBookService.orderByType("latest");
            } else if ("likes".equals(sortType)) {
                // 모든 게시물을 좋아요순으로 정렬
                return  eBookService.orderByType("likes");
            }
        }
        return eBookService.findAll();
    }

    @GetMapping("/detail/{book_id}")
    @Operation(summary = "책 소개 페이지", description="특정 책의 정보를 보여주는 페이지입니다.")
    public ResEBookDTO getBook(@PathVariable int book_id, @AuthenticationPrincipal UserEntity user) {
        return eBookService.getBook(book_id, user);
    }


    @GetMapping("/detail/viewer/{book_id}")
    @Operation(summary = "책 뷰어 열기", description="특정 책의 내용을 뷰어를 통해 보여줍니다.")
    public ResEBookContentDTO getContent(@PathVariable int book_id){

        return eBookService.getContent(book_id);
    }

    @PostMapping("/like/{book_id}")
    @Operation(summary = "좋아요 추가/취소")
    public DibResultDTO ebookDib(@PathVariable int book_id, @AuthenticationPrincipal UserEntity userEntity) {
        DibResult dibResult= eBookService.dib(book_id,userEntity);
        long counts = eBookService.countDibs(book_id);
        return new DibResultDTO(counts, dibResult);
    }
}
