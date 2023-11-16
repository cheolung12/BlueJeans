package com.bluejeans.server.service;

import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class UserDetailService implements UserDetailsService {
    private  final UserRepository userRepository;

    @Override
    public UserEntity loadUserByUsername(String userID) throws UsernameNotFoundException {
        System.out.println("유저검색하기");
        return userRepository.findByUserID(userID)
                .orElseThrow(() ->new UsernameNotFoundException("User not found with username: " + userID));
    }
}
