package com.bluejeans.server.service;

import com.bluejeans.server.dto.UserDTO;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public void join(UserDTO userDTO) {
        UserEntity created = UserEntity.builder()
                .nickname(userDTO.getNickname())
                .password(userDTO.getPassword())
                .address(userDTO.getAddress())
                .build();

        userRepository.save(created);
    }
}
