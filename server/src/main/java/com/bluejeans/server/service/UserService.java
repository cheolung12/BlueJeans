package com.bluejeans.server.service;

import com.bluejeans.server.dto.UserDTO;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.entity.Usertype;
import com.bluejeans.server.repository.EssayRepository;
import com.bluejeans.server.repository.RecruitDibRepository;
import com.bluejeans.server.repository.RecruitRepository;
import com.bluejeans.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EssayRepository essayRepository;
    private final RecruitRepository recruitRepository;


    //회원가입
    public int join(UserDTO userDTO){
        //아이디 중복검사
        if (userRepository.existsByUserID(userDTO.getUserID())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        //중복이 아니라면 회원가입
        return userRepository.save(UserEntity.builder()
                .userID(userDTO.getUserID())
                .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
                .nickname(userDTO.getNickname())
                .address(userDTO.getAddress())
                .userType(Usertype.USER)
                .img_path("https://bluejeansbucket2.s3.ap-northeast-2.amazonaws.com/user/defaultprofile.jpeg")
                .build()).getId();
    }


    public void patchUser(Integer id, UserDTO userDTO) {
        UserEntity existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        // 업데이트할 필드가 비어있지 않다면 새로운 값으로 업데이트
        if (userDTO.getPassword() != null) {
            existingUser.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        }
        if (userDTO.getNickname() != null) {
            existingUser.setNickname(userDTO.getNickname());
        }
        if (userDTO.getAddress() != null) {
            existingUser.setAddress(userDTO.getAddress());
        }

        // 수정된 정보를 저장
        userRepository.save(existingUser);
    }

    @Transactional
    public void delete(int id) {
        Optional<UserEntity> userOptional = userRepository.findById(id);


        if (userOptional.isPresent())  {

            recruitRepository.deleteByUser_Id(userOptional.get().getId());
            essayRepository.deleteByUser_Id(userOptional.get().getId());
            userRepository.delete(userOptional.get());
        } else {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
    }


    public boolean checkDuplicate(String type, String value) {

        if(type.equals("userID")){
            return userRepository.existsByUserID(value);
        } else if(type.equals("nickname")){
            return userRepository.existsByNickname(value);
        }
        return false;
    }
}
