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
    EssayRepository essayRepository;

    @Autowired
    private RecruitDibRepository recruitDibRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EBookDibRepository eBookDibRepository;

    @Autowired
    private EssayDibRepository essayDibRepository;

    @Autowired
    S3Uploader s3Uploader;


    public List<ResRecruitDTO> convertRecruitEntitiesToDTOList(List<RecruitEntity> recruitList) {
        return recruitList.stream()
                .map(recruit -> ResRecruitDTO.toDTO(recruit, recruitDibRepository.countByRecruit(recruit)))
                .collect(Collectors.toList());
    }

    public List<ResEBookDTO> convertEBookEntitiesToDTOList(List<EBookEntity> ebookList) {
        return ebookList.stream()
                .map(ebook -> ResEBookDTO.toDTO(ebook, eBookDibRepository.countByEbook(ebook)))
                .collect(Collectors.toList());
    }

    public List<ResEssayDTO> convertEssayEntitiesToDTOList(List<EssayEntity> essayList) {
        return essayList.stream()
                .map(essay -> ResEssayDTO.toDTO(essay, essayDibRepository.countByEssay(essay)))
                .collect(Collectors.toList());
    }

    public ResMyPageDTO getUserInfo(UserEntity user) {
        int userId = user.getId();

        // 엔티티 리스트를 DTO 리스트로
        List<ResRecruitDTO> RecruitLists = convertRecruitEntitiesToDTOList(recruitRepository.findByRecruitDibsUserId(userId));
        List<ResEBookDTO> EBookLists = convertEBookEntitiesToDTOList(ebookRepository.findByEbookDibsUserId(userId));
        List<ResEssayDTO> EssayLists = convertEssayEntitiesToDTOList(essayRepository.findByEssayDibsUserId(userId));

        return ResMyPageDTO.builder()
                .nickname(user.getNickname())
                .address(user.getAddress())
                .MyEssayList(EssayLists)
                .MyEBookList(EBookLists)
                .MyRecruitList(RecruitLists)
                .build();
    }

    public boolean editUserInfo (MultipartFile multipartFile, UserEntity user, EditUserInfoDTO editDTO) throws IOException {
        if(user == null){
            return false;
        }
        String fileURL = s3Uploader.upload(multipartFile, "user");

        user.updateFields(editDTO, fileURL);
        userRepository.save(user);
        return true;
    }

    public ResMainDTO getMainPost() {

        List<ResRecruitDTO> RecruitLists = convertRecruitEntitiesToDTOList(recruitRepository.findLatestPosts());
        List<ResEBookDTO> EBookLists = convertEBookEntitiesToDTOList(ebookRepository.findRandomEBooks());
        List<ResEssayDTO> EssayLists = convertEssayEntitiesToDTOList(essayRepository.findFavoritePosts());

        return ResMainDTO.builder()
                .EssayList(EssayLists)
                .EBookList(EBookLists)
                .RecruitList(RecruitLists)
                .build();
    }


}
