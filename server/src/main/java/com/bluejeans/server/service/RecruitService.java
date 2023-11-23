package com.bluejeans.server.service;

import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.*;
import com.bluejeans.server.repository.RecruitDibRepository;
import com.bluejeans.server.repository.RecruitFileRepository;
import com.bluejeans.server.repository.RecruitRepository;
import com.bluejeans.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecruitService {

    @Autowired
    private RecruitRepository recruitRepository;

    @Autowired
    private RecruitFileRepository recruitFileRepository;

    @Autowired
    private RecruitDibRepository recruitDibRepository;

    @Autowired
    private UserRepository userRepository;

/*
    // 엔티티 리스트를 DTO리스트로
    private List<RecruitDTO> entityListToDTOList(List<RecruitEntity> recruitList) {
        List<RecruitDTO> result = new ArrayList<>();

        if (recruitList.isEmpty()) {
            return result;
        }
        // 엔티티 -> DTO
        for (RecruitEntity recruit : recruitList) {
            RecruitFileEntity file = recruitFileRepository.findByRecruitId(recruit.getId()).orElse(null);
            int like = recruitDibRepository.countByRecruit_Id(recruit.getId());
            result.add(ResRecruitDTO.toDTO(recruit, file, like));
        }

        return result;
    }



    public List<RecruitDTO> findAll() {
        List<RecruitEntity> recruitList = recruitRepository.findAll();

        return entityListToDTOList(recruitList);
    }

    public List<RecruitDTO> findByRegion(String region) {
        List<RecruitEntity> filteredList = recruitRepository.findByRegion(region);

        return entityListToDTOList(filteredList);
    }

    public List<RecruitDTO> filteringRecruit(String order) {
        List<RecruitEntity> filteredList =  recruitRepository.filteringRecruit(order);

        return entityListToDTOList(filteredList);
    }

    public List<RecruitDTO> searchByKeyword(String keyword) {
        List<RecruitEntity> searchedList = recruitRepository.searchByKeyword(keyword);

        return entityListToDTOList(searchedList);
    }
*/
    public boolean registerRecruit(RecruitDTO recruitDTO, UserEntity user, String fileURL) {
        System.out.println("서비스");
        // DTO -> 엔티티
        RecruitEntity added = RecruitDTO.toEntity(recruitDTO, user);

        try {
            RecruitEntity saved = recruitRepository.save(added);
            RecruitFileEntity file = RecruitFileEntity.builder()
                    .recruitId(saved)
                    .img_path(fileURL)
                    .build();
            recruitFileRepository.save(file);
            return true;
        } catch (Exception e) {
            // 추후 AOP를 통해 에러로그
            System.out.println("공고 등록 실패!: " + e.getMessage());
            return false;
        }
    }
/*
    public ResRecruitDTO recruitDetail(int id) {
        Optional<RecruitEntity> recruit = recruitRepository.findById(id);
        RecruitFileEntity file = recruitFileRepository.findByRecruitId(id).orElse(null);
        int like = recruitDibRepository.countByRecruit_Id(id);
        if(recruit.isPresent()){
            return ResRecruitDTO.toDTO(recruit.get(), file, like);
        } else {
            return null;
        }
    }
/*

    public boolean editRecruit(int id, RecruitDTO recruitDTO) {
        // 해당 게시물 조회
        Optional<RecruitEntity> recruit = recruitRepository.findById(id);
        Optional<RecruitFileEntity>  file = recruitFileRepository.findByRecruitId(id);
        // 수정
        if(recruit.isPresent()) {
            RecruitEntity existingEntity = recruit.get();
            existingEntity.updateFields(recruitDTO);
            recruitRepository.save(existingEntity);

            if(file.isPresent()){
                RecruitFileEntity fileEntity = file.get();
                fileEntity.updateImgPath(RecruitDTO.getImg_path());
                recruitFileRepository.save(fileEntity);
            }

            return true;
        }else {
            return false;
        }
    }

*/

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
/*
    public List<RecruitDTO> myLikeRecruit(UserEntity user) {
        int userId = user.getId();
        List<RecruitEntity> likedRecruits = recruitRepository.findByRecruitDibsUserId(userId);

        return entityListToDTOList(likedRecruits);
    }

 */
}
