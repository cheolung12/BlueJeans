package com.bluejeans.server.service;

import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.*;
import com.bluejeans.server.repository.RecruitDibRepository;
//import com.bluejeans.server.repository.RecruitFileRepository;
import com.bluejeans.server.repository.RecruitRepository;
import com.bluejeans.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecruitService {

    @Autowired
    private RecruitRepository recruitRepository;

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private RecruitDibRepository recruitDibRepository;

    @Autowired
    private UserRepository userRepository;


    // 엔티티 리스트를 DTO리스트로
    private List<ResRecruitDTO> entityListToDTOList(List<RecruitEntity> recruitList) {
        List<ResRecruitDTO> result = new ArrayList<>();

        if (recruitList.isEmpty()) {
            return result;
        }
        // 엔티티 -> DTO
        for (RecruitEntity recruit : recruitList) {
            int like = recruitDibRepository.countByRecruit_Id(recruit.getId());
            result.add(ResRecruitDTO.toDTO(recruit, like));
        }

        return result;
    }



    // 전체 조회
    public List<ResRecruitDTO> findAll() {
        List<RecruitEntity> recruitList = recruitRepository.findAll();

        return entityListToDTOList(recruitList);
    }

    //집근처 조회
    public List<ResRecruitDTO> findByRegion(String region) {
        List<RecruitEntity> filteredList = recruitRepository.findByRegion(region);

        return entityListToDTOList(filteredList);
    }

    //최신순, 인기순 필터링
    public List<ResRecruitDTO> filteringRecruit(String order) {
        List<RecruitEntity> filteredList =  recruitRepository.filteringRecruit(order);

        return entityListToDTOList(filteredList);
    }

    // 검색어 조회
    public List<ResRecruitDTO> searchByKeyword(String keyword) {
        List<RecruitEntity> searchedList = recruitRepository.searchByKeyword(keyword);

        return entityListToDTOList(searchedList);
    }


    //공고 등록
    public boolean registerRecruit(RecruitDTO recruitDTO, UserEntity user, MultipartFile multipartFile) throws IOException {
        System.out.println("등록시작");
        String fileURL = s3Uploader.upload(multipartFile, "jobs");
        // DTO -> 엔티티
        RecruitEntity added = RecruitDTO.toEntity(recruitDTO, user, fileURL);
        System.out.println(added);
        try {
            RecruitEntity saved = recruitRepository.save(added);
            return true;
        } catch (Exception e) {
            // 추후 AOP를 통해 에러로그
            System.out.println("공고 등록 실패!: " + e.getMessage());
            return false;
        }
    }

    public ResRecruitDTO recruitDetail(int id) {
        Optional<RecruitEntity> recruit = recruitRepository.findById(id);
        int like = recruitDibRepository.countByRecruit_Id(id);
        if(recruit.isPresent()){
            return ResRecruitDTO.toDTO(recruit.get(), like);
        } else {
            return null;
        }
    }


    public boolean editRecruit(int id, RecruitDTO recruitDTO, MultipartFile multipartFile) throws IOException {
        // 해당 게시물 조회
        Optional<RecruitEntity> recruit = recruitRepository.findById(id);
        String fileURL = s3Uploader.upload(multipartFile, "jobs");
        // 수정
        if(recruit.isPresent()) {
            RecruitEntity existingEntity = recruit.get();
            existingEntity.updateFields(recruitDTO, fileURL);
            recruitRepository.save(existingEntity);

            return true;
        }else {
            return false;
        }
    }



    public boolean deleteRecruit(int jobId) {
        // 해당 게시물 조회
        Optional<RecruitEntity> recruit = recruitRepository.findById(jobId);

        // 삭제
        if (recruit.isPresent()) {
            recruitRepository.deleteById(jobId);
            return true;
        } else {
            return false;
        }
    }

    public boolean likeClick(int jobId, UserEntity userEntity) {
        int userId = userEntity.getId();
        // 좋아요 여부를 확인하기 위한 키를 생성
        RecruitDibsEntityKey key = new RecruitDibsEntityKey(jobId, userId);
        Optional<RecruitDibsEntity> existingDibs = recruitDibRepository.findById(key);

        // 상태에따라 추가 혹은 삭제
        if (existingDibs.isPresent()) {
            recruitDibRepository.deleteById(key);
            return false;
        } else {
            // 좋아요가 안되어 있으면 추가
            RecruitEntity recruit = recruitRepository.findById(jobId).orElse(null);
            UserEntity user = userRepository.findById(userId).orElse(null);

            if (recruit != null && user != null) {
                RecruitDibsEntity newDibs = RecruitDibsEntity.builder()
                        .recruit(recruit)
                        .user(user)
                        .build();

                recruitDibRepository.save(newDibs);
                return true; // 좋아요 추가
            } else {
                return false; // 공고나 유저를 찾을 수 없음
            }
        }
    }

    public List<ResRecruitDTO> myLikeRecruit(UserEntity user) {
        int userId = user.getId();
        List<RecruitEntity> likedRecruits = recruitRepository.findByRecruitDibsUserId(userId);

        return entityListToDTOList(likedRecruits);
    }


}
