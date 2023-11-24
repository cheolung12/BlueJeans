package com.bluejeans.server.controller;

import com.bluejeans.server.dto.DibResultDTO;
import com.bluejeans.server.dto.EssayDTO;
import com.bluejeans.server.dto.ResEssayDTO;
import com.bluejeans.server.dto.UserDTO;
import com.bluejeans.server.entity.DibResult;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.EssayService;
import com.bluejeans.server.service.UserService;
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


    //에세이 전체 조회
    @GetMapping
    public List<ResEssayDTO> findAll(){
        return essayService.findAll();

    }

    //에세이 글쓰기
    @PostMapping
    public EssayEntity addEssay(@RequestParam(value = "file", required = false) MultipartFile multipartFile, @ModelAttribute EssayDTO essayDTO, @AuthenticationPrincipal UserEntity user) throws IOException {
        //로그인이 안되어있을경우 오류처리?
        //로그인해야 이용가능하도록 구현해야함.
        EssayEntity result = essayService.addEssay(essayDTO, user, multipartFile);
        return result;
    }

    //에세이 상세조회
    @GetMapping("/detail/{essay_id}")
    public ResEssayDTO essayDetail(@PathVariable int essay_id){
        ResEssayDTO result = essayService.essayDetail(essay_id);
        //결과가 없을경우 null로 들어옴
        return result;
    }

    //에세이 수정
    @PatchMapping("/detail/{essay_id}")
    public boolean essayEdit(@PathVariable int essay_id, @RequestParam("file") MultipartFile multipartFile, @ModelAttribute EssayDTO essayDTO) throws IOException {
        //로그인한 유저의 id와 에세이의 user_id가 일치할경우 수정가능하도록(불일치할 경우 null반환)
        //하려했으나 프론트에서 검사해야함.
        return essayService.edit(essay_id,multipartFile, essayDTO);
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




}
