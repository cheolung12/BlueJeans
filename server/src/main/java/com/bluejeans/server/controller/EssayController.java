package com.bluejeans.server.controller;

import com.bluejeans.server.dto.EssayDTO;
import com.bluejeans.server.dto.UserDTO;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.service.EssayService;
import com.bluejeans.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EssayController {

    @Autowired
    EssayService essayService;


    //에세이 전체 조회
    @GetMapping("/essays")
    public List<EssayDTO> findAll(){
        List<EssayDTO> result = essayService.findAll();
        System.out.println(result.get(0).getTitle());
        return result;
    }

    //에세이 글쓰기
    @PostMapping("/essays")
    public EssayEntity addEssay(@RequestBody EssayDTO essayDTO, @AuthenticationPrincipal UserEntity user){
        //로그인이 안되어있을경우 오류처리?
        //로그인해야 이용가능하도록 구현해야함.
        EssayEntity result = essayService.addEssay(essayDTO, user);
        return result;
    }

    //에세이 상세조회
    @GetMapping("/essays/detail/{essay_id}")
    public EssayDTO essayDetail(@PathVariable int essay_id){
        EssayDTO result = essayService.essayDetail(essay_id);
        //결과가 없을경우 null로 들어옴
        return result;
    }

    //에세이 수정
    @PatchMapping("/essays/detail/{essay_id}")
    public boolean essayEdit(@PathVariable int essay_id, @RequestBody EssayDTO essayDTO){
        //로그인한 유저의 id와 에세이의 user_id가 일치할경우 수정가능하도록(불일치할 경우 null반환)
        //하려했으나 프론트에서 검사해야함.
        essayService.edit(essay_id,essayDTO.getTitle(), essayDTO.getContent());
        return true;
    }

    //에세이 삭제
    @DeleteMapping("/essays/detail/{essay_id}")
    public boolean essayDelete(@PathVariable int essay_id){
        essayService.essayDelete(essay_id);
        return true;
    }

    //좋아요 누르기
//    @GetMapping("/essays/detail/{essay_id}/favorite")
//    public boolean essayDib(@PathVariable int essay_id, @AuthenticationPrincipal UserDTO userdto){
//        essayService.dib(essay_id,userdto);
//        return true;
//    }


    ///////////////에세이 좋아요
    @GetMapping("/essays/detail/{essay_id}/favorite")
    public boolean essayDib(@PathVariable int essay_id, @AuthenticationPrincipal UserEntity userEntity){
        System.out.println(userEntity);
        essayService.dib(essay_id,userEntity);
        return true;
    }




}
