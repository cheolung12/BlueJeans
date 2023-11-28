package com.bluejeans.server.controller;

import com.bluejeans.server.dto.*;
import com.bluejeans.server.entity.DibResult;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.EssayService;
import com.bluejeans.server.service.S3Uploader;
import com.bluejeans.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/essays")
public class EssayController {

    @Autowired
    EssayService essayService;

    @Autowired
    S3Uploader s3Uploader;


    //에세이 전체 조회
    @GetMapping
    public List<ResEssayDTO> findAll(){
        return essayService.findAll();

    }

    //에세이 글쓰기
    @PostMapping(consumes = "multipart/form-data")
    public EssayEntity addEssay(@RequestParam(value = "file", required = false) MultipartFile multipartFile, @ModelAttribute EssayDTO essayDTO, @AuthenticationPrincipal UserEntity user) {
        String fileURL = null;
        try {
            fileURL = s3Uploader.upload(multipartFile, "essay");
        } catch (IOException e) {
            fileURL = null;
        }
        EssayEntity result = essayService.addEssay(essayDTO, user, fileURL);
        return result;
    }

    //에세이 상세조회 +댓글
    @GetMapping("/detail/{essay_id}")
    public ResEssayDetailDTO essayDetail(@PathVariable int essay_id){
        ResEssayDetailDTO result = essayService.essayDetail(essay_id);
        //결과가 없을경우 null로 들어옴
        return result;
    }

    //에세이 수정
    @PatchMapping("/detail/{essay_id}")
    public boolean essayEdit(@PathVariable int essay_id, @RequestParam(value = "file", required = false) MultipartFile multipartFile, @ModelAttribute EssayDTO essayDTO) {
        //로그인한 유저의 id와 에세이의 user_id가 일치할경우 수정가능하도록(불일치할 경우 null반환)
        //하려했으나 프론트에서 검사해야함.
        String fileURL = null;
        try {
            fileURL = s3Uploader.upload(multipartFile, "essay");
        } catch (IOException e) {
            fileURL = null;
        }
        return essayService.edit(essay_id,fileURL, essayDTO);
    }

    //에세이 삭제
    @DeleteMapping("/detail/{essay_id}")
    public boolean essayDelete(@PathVariable int essay_id){
        essayService.essayDelete(essay_id);
        return true;
    }



    ///////////////에세이 좋아요
    @GetMapping("/detail/{essay_id}/favorite")
    public DibResultDTO essayDib(@PathVariable int essay_id, @AuthenticationPrincipal UserEntity userEntity){
        
        DibResult dibResult= essayService.dib(essay_id,userEntity);
        long counts = essayService.countDibs(essay_id);
        return new DibResultDTO(counts, dibResult);
    }


    //댓글 조회
    @GetMapping("/detail/{essay_id}/comments")
    @Operation(summary = "댓글 조회")
    public List<ResCommentDTO> essayComments(@PathVariable int essay_id){
        return essayService.essayComments(essay_id);
    }

    //댓글 작성
    @PostMapping("/comment/{essay_id}")
    public boolean addComment(@PathVariable int essay_id, @RequestBody String comment, @AuthenticationPrincipal UserEntity user){
        return essayService.addComment(essay_id,comment, user);
    }

    //댓글 삭제
    @DeleteMapping("/comment/{comment_id}")
    public boolean deleteComment( @PathVariable int comment_id, @AuthenticationPrincipal UserEntity user){
        return essayService.deleteComment(comment_id, user);

    }




}
