package com.bluejeans.server.controller;

import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name="findhome API", description = "집찾기 api 입니다.")
@RequestMapping("/api/findhome")
public class FindHomeController {


    @PostMapping
    public String findhome(@AuthenticationPrincipal UserEntity user){
        return user.getAddress();
    }
}
