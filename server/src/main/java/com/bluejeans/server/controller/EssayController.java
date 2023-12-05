package com.bluejeans.server.controller;

import com.bluejeans.server.dto.*;
import com.bluejeans.server.entity.DibResult;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.EssayService;
import com.bluejeans.server.service.S3Uploader;
import com.bluejeans.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Tag(name="Essay API", description = "Essay 관련 API 입니다.")
@RequestMapping("/api/essays")
public class EssayController {

    @Autowired
    EssayService essayService;

    @Autowired
    S3Uploader s3Uploader;

    @GetMapping
    @Operation(summary="에세이 전체 조회")
    public List<ResEssayDTO> findAll(){
        return essayService.findAll();

    }

    @PostMapping(consumes = "multipart/form-data")
    @Operation(summary = "에세이 글쓰기")
    public EssayEntity addEssay(@RequestParam(value = "file", required = false) MultipartFile multipartFile, @ModelAttribute EssayDTO essayDTO, @AuthenticationPrincipal UserEntity user) {
        String fileURL = null;
        try {
            fileURL = s3Uploader.upload(multipartFile, "essay");
        } catch (IOException e) {
            fileURL = "https://www.moodfit.com/front/images/genral_image_notfound.png";
        }
        EssayEntity result = essayService.addEssay(essayDTO, user, fileURL);
        return result;
    }

    @GetMapping("/detail/{essay_id}")
    @Operation(summary = "에세이 상세조회, 댓글, 좋아요", description = "게시물을 상세조회하고 댓글과 좋아요 개수를 불러옵니다.")
    public ResEssayDetailDTO essayDetail(@PathVariable int essay_id){
        ResEssayDetailDTO result = essayService.essayDetail(essay_id);
        //결과가 없을경우 null로 들어옴
        return result;
    }

    @GetMapping("/detail/islogin/{essay_id}")
    @Operation(summary = "에세이 상세조회 (로그인 되어있을 때)", description = "게시물을 상세조회 하고 사용자의 좋아요 여부까지 반환합니다.")
    public ResEssayDetailDTO essayDetailisLogin(@PathVariable int essay_id, @AuthenticationPrincipal UserEntity user){
        ResEssayDetailDTO result = essayService.essayDetailisLogin(essay_id, user);
        //결과가 없을경우 null로 들어옴
        return result;
    }

    @PatchMapping("/detail/{essay_id}")
    @Operation(summary = "에세이 수정")
    public boolean essayEdit(@PathVariable int essay_id, @RequestParam(value = "file", required = false) MultipartFile multipartFile, @ModelAttribute EssayDTO essayDTO) {
        //로그인한 유저의 id와 에세이의 user_id가 일치할경우 수정가능하도록(불일치할 경우 null반환)
        //하려했으나 프론트에서 검사해야함.
        String fileURL = null;
        if(multipartFile != null) {
            try {
                fileURL = s3Uploader.upload(multipartFile, "essay");
            } catch (IOException e) {
                fileURL = null;
            }
        }
        return essayService.edit(essay_id,fileURL, essayDTO);
    }

    @DeleteMapping("/detail/{essay_id}")
    @Operation(summary = "에세이 삭제")
    public boolean essayDelete(@PathVariable int essay_id){
        essayService.essayDelete(essay_id);
        return true;
    }


    @PostMapping("/detail/{essay_id}/likes")
    @Operation(summary = "에세이 좋아요/취소", description = "로그인이 되어있을 경우에만 가능합니다.")
    public DibResultDTO essayDib(@PathVariable int essay_id, @AuthenticationPrincipal UserEntity userEntity){
        
        DibResult dibResult= essayService.dib(essay_id,userEntity);
        long counts = essayService.countDibs(essay_id);
        return new DibResultDTO(counts, dibResult);
    }


    @GetMapping("/detail/{essay_id}/comments")
    @Operation(summary = "댓글 조회", description = "해당 게시물의 댓글을 조회합니다")
    public List<ResCommentDTO> essayComments(@PathVariable int essay_id){
        return essayService.essayComments(essay_id);
    }

    @PostMapping("/comment/{essay_id}")
    @Operation(summary = "댓글 작성")
    public boolean addComment(@PathVariable int essay_id, @RequestBody CommentDTO comment, @AuthenticationPrincipal UserEntity user){
        System.out.println(comment.getComment());
        return essayService.addComment(essay_id,comment, user);
    }

    @DeleteMapping("/comment/{comment_id}")
    @Operation(summary = "댓글 삭제")
    public boolean deleteComment( @PathVariable int comment_id, @AuthenticationPrincipal UserEntity user){
        return essayService.deleteComment(comment_id, user);
    }
}
