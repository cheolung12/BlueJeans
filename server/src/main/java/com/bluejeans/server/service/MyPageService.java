package com.bluejeans.server.service;

import com.bluejeans.server.dto.*;
import com.bluejeans.server.entity.EBookEntity;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.RecruitEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.ArrayList;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MyPageService {

    @Autowired
    private RecruitRepository recruitRepository;

    @Autowired
    private EBookRepository ebookRepository;

    @Autowired
    private EssayRepository essayRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    S3Uploader s3Uploader;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;



    public void convertRecruitEntitiesToDTO(List<MyPostsDTO> DTOList, List<RecruitEntity> recruitList) {
        for(RecruitEntity recruit :recruitList){
            DTOList.add(MyPostsDTO.builder()
                    .type("recruitment")
                    .id(recruit.getId())
                    .title(recruit.getTitle())
                    .img_path(recruit.getImg_path())
                    .createdAt(recruit.getCreated_at())
                    .build()
            );
        }
    }

    public void convertEBookEntitiesToDTO(List<MyPostsDTO> DTOList, List<EBookEntity> ebookList) {
        for(EBookEntity ebook :ebookList){
            DTOList.add(MyPostsDTO.builder()
                    .type("ebook")
                    .id(ebook.getId())
                    .title(ebook.getTitle())
                    .img_path(ebook.getThumbnail())
                    .createdAt(ebook.getCreated_at())
                    .build()
            );
        }
    }

    public void convertEssayEntitiesToDTO(List<MyPostsDTO> DTOList, List<EssayEntity> essayList) {
        for(EssayEntity essay :essayList){
            DTOList.add(MyPostsDTO.builder()
                    .type("essay")
                    .id(essay.getId())
                    .title(essay.getTitle())
                    .img_path(essay.getImg_path())
                    .createdAt(essay.getCreated_at())
                    .build()
            );
        }
    }

    public ResMyPageDTO getUserInfo(UserEntity user) {
        int userId = user.getId();
        UserEntity userEntity = userRepository.findById(userId).orElse(null);

        List<MyPostsDTO> MyLikePosts= new ArrayList<>();
        List<MyPostsDTO> MyWritePosts = new ArrayList<>();

        convertRecruitEntitiesToDTO(MyLikePosts, recruitRepository.findByRecruitDibsUserId(userId));
        convertEBookEntitiesToDTO(MyLikePosts, ebookRepository.findByEbookDibsUserId(userId));
        convertEssayEntitiesToDTO(MyLikePosts, essayRepository.findByEssayDibsUserId(userId));

        convertRecruitEntitiesToDTO(MyWritePosts, recruitRepository.findByUser_Id(userId));
        convertEssayEntitiesToDTO(MyWritePosts, essayRepository.findByUser_Id(userId));

        return ResMyPageDTO.builder()
                .userId(userEntity.getUserID())
                .nickname(userEntity.getNickname())
                .address(userEntity.getAddress())
                .img_path(userEntity.getImg_path())
                .likedPost(MyLikePosts)
                .writedPost(MyWritePosts)
                .build();
    }

//    public boolean editUserInfo (UserEntity user, EditUserInfoDTO editDTO)  {
//        String fileURL =null;
//        user.updateFields(editDTO, fileURL);
//        userRepository.save(user);
//        return true;
//    }

    public boolean editUser(String fileURL, UserEntity user, EditUserInfoDTO updateUser) {
        UserEntity existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + user.getUserID()));

        // 업데이트할 필드가 비어있지 않다면 새로운 값으로 업데이트
        if (!Objects.equals(updateUser.getPassword(), "null")) {
            existingUser.setPassword(bCryptPasswordEncoder.encode(updateUser.getPassword()));
        }
        if (!updateUser.getNickname().isEmpty()) {
            System.out.println("닉네임 Null 아님");
            existingUser.setNickname(updateUser.getNickname());
        }
        if (!updateUser.getAddress().isEmpty()) {
            existingUser.setAddress(updateUser.getAddress());
        }
        if(fileURL != null) {
            existingUser.setImg_path(fileURL);
        }

        // 수정된 정보를 저장
        userRepository.save(existingUser);
        return true;
    }
}
