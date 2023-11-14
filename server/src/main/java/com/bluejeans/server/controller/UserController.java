package com.bluejeans.server.controller;

import com.bluejeans.server.dto.UserDTO;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.UserRepository;
import com.bluejeans.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping()
    public void joinUser(@RequestBody  UserDTO userDTO){
        userService.join(userDTO);
        //dhks
    }
}
