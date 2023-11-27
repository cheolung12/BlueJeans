package com.bluejeans.server.controller;

import com.bluejeans.server.dto.DibResultDTO;
import com.bluejeans.server.dto.ResEBookContentDTO;
import com.bluejeans.server.dto.ResEBookDTO;
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
    @Operation(summary = "ebook 전체 조회")
    public List<ResEBookDTO> findAll() {
        return eBookService.findAll();
    }

    @GetMapping("/detail/{book_id}")
    @Operation(summary = "책 소개 페이지", description="특정 책의 정보를 보여주는 페이지입니다.")
    public ResEBookDTO getBook(@PathVariable int book_id) {
        return eBookService.getBook(book_id);
    }


    @GetMapping("/detail/viewer/{book_id}")
    @Operation(summary = "책 뷰어 열기", description="특정 책의 내용을 뷰어를 통해 보여줍니다.")
    public ResEBookContentDTO getContent(@PathVariable int book_id){

        return eBookService.getContent(book_id);
    }

    @GetMapping("/search")
    @Operation(summary = "키워드로 책 제목 검색")
    @Parameter(name="keyword", description = "사용자가 입력한 검색어")
    public List<ResEBookDTO> searchByKeyword(@RequestParam String keyword) {

        return eBookService.searchByKeyword(keyword);
    }

    @GetMapping("/order")
    @Operation(summary = "인기순 또는 최신순 정렬")
    @Parameter(name="orderby", description="favorite or latest")
    public List<ResEBookDTO> orderByKeyword(@RequestParam String orderby){

        return eBookService.orderByKeyword(orderby);
    }

    @PostMapping("/like/{book_id}")
    @Operation(summary = "좋아요 추가/취소")
    @Parameter(name="userEntity", description = "좋아요 여부를 확인하기 위한 user엔티티")
    public DibResultDTO ebookDib(@PathVariable int book_id, @AuthenticationPrincipal UserEntity userEntity) {
        DibResult dibResult= eBookService.dib(book_id,userEntity);
        long counts = eBookService.countDibs(book_id);
        return new DibResultDTO(counts, dibResult);
    }
}
