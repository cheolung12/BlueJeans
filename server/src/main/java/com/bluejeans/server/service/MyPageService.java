package com.bluejeans.server.service;

import com.bluejeans.server.dto.*;
import com.bluejeans.server.entity.EBookEntity;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.RecruitEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.ArrayList;

import java.util.List;
import java.util.stream.Collectors;

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

        List<MyPostsDTO> MyLikePosts= new ArrayList<>();
        List<MyPostsDTO> MyWritePosts = new ArrayList<>();

        convertRecruitEntitiesToDTO(MyLikePosts, recruitRepository.findByRecruitDibsUserId(userId));
        convertEBookEntitiesToDTO(MyLikePosts, ebookRepository.findByEbookDibsUserId(userId));
        convertEssayEntitiesToDTO(MyLikePosts, essayRepository.findByEssayDibsUserId(userId));

        convertRecruitEntitiesToDTO(MyWritePosts, recruitRepository.findByUser_Id(userId));
        convertEssayEntitiesToDTO(MyWritePosts, essayRepository.findByUser_Id(userId));

        return ResMyPageDTO.builder()
                .userId(user.getUserID())
                .nickname(user.getNickname())
                .address(user.getAddress())
                .img_path(user.getImg_path())
                .likedPost(MyLikePosts)
                .writedPost(MyWritePosts)
                .build();
    }

    public boolean editUserInfo (String fileURL, UserEntity user, EditUserInfoDTO editDTO)  {

        user.updateFields(editDTO, fileURL);
        userRepository.save(user);
        return true;

    }
}
