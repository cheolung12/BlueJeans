package com.bluejeans.server.controller;

import com.bluejeans.server.dto.UserDTO;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.UserRepository;
import com.bluejeans.server.service.UserService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    //회원가입
    @PostMapping("/user")
    public String signup(@RequestBody  UserDTO userDTO){
        try {
            userService.join(userDTO);
            return "redirect:/login";
        } catch (IllegalArgumentException e) {
            System.out.println(e); //오류메시지 보내기
            // 아이디 중복 예외가 발생하면 회원가입 화면으로 리다이렉트
            return "redirect:/signup";
        }
    }

    //회원정보 수정하기
    @PatchMapping("/user/{id}")
    public String patchUser(@PathVariable int id, @RequestBody UserDTO userDTO){
        userService.patchUser(id, userDTO);
    return "user";
    }

    //회원 탈퇴
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable int id){
        userService.delete(id);
        return "회원탈퇴완료";
    }

    //home에서 세션에 있는 정보로 유저정보 가져오기
    @GetMapping("/home")
    @ResponseBody
    public UserEntity home(@AuthenticationPrincipal UserEntity user ){ //여기서 세션을..
        System.out.println(user.getAddress() + "테스트");
        return user;
    }


    //겟방식 로그인??
    @GetMapping("/login")
    public String login(){
        return "login";
    }


    //회원가입 화면
    @GetMapping("/user")
    public String signup(){
        return "signup";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/login";
    }

}
