package com.bluejeans.server.service;

import com.bluejeans.server.dto.DibResultDTO;
import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.*;
import com.bluejeans.server.repository.RecruitDibRepository;
//import com.bluejeans.server.repository.RecruitFileRepository;
import com.bluejeans.server.repository.RecruitRepository;
import com.bluejeans.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.bluejeans.server.entity.DibResult.*;

@Service
@Slf4j
public class RecruitService {

    @Autowired
    private RecruitRepository recruitRepository;

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private RecruitDibRepository recruitDibRepository;


    // 엔티티 리스트를 DTO리스트로
    private List<ResRecruitDTO> entityListToDTOList(List<RecruitEntity> recruitList) {
        List<ResRecruitDTO> result = new ArrayList<>();

        if (recruitList.isEmpty()) {
            return result;
        }
        // 엔티티 -> DTO
        for (RecruitEntity recruit : recruitList) {
            int like = recruitDibRepository.countByRecruit(recruit);
            result.add(ResRecruitDTO.toDTO(recruit, like));
        }

        return result;
    }


    // 전체 조회
    public List<ResRecruitDTO> findAll() {
        List<RecruitEntity> recruitList = recruitRepository.findAll();

        return entityListToDTOList(recruitList);
    }


    //최신순, 인기순 필터링
    public List<ResRecruitDTO> orderByType(String type) {
        List<RecruitEntity> filteredList =  recruitRepository.orderByType(type);

        return entityListToDTOList(filteredList);
    }

    // 검색하고 최신순 정렬
    public List<ResRecruitDTO> searchByKeywordAndOrderByLatest(String searchKeyword) {
        List<RecruitEntity> recruitEntities = recruitRepository.searchByKeywordAndOrderByLatest(searchKeyword);

        return entityListToDTOList(recruitEntities);
    }

    // 검색하고 좋아요순 정렬
    public List<ResRecruitDTO> searchByKeywordAndOrderByLikes(String searchKeyword) {
        List<RecruitEntity> recruitEntities = recruitRepository.searchByKeywordAndOrderByLikes(searchKeyword);

        return entityListToDTOList(recruitEntities);
    }


    //공고 등록
    public boolean registerRecruit(RecruitDTO recruitDTO, UserEntity user, String fileURL)  {
        System.out.println("등록시작");

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

    // 공고 상세
    public ResRecruitDTO recruitDetail(int jobId, UserEntity user) {
        RecruitEntity recruit = recruitRepository.findById(jobId).orElse(null);
        int like = recruitDibRepository.countByRecruit(recruit);
        int userId = user.getId();
        boolean isHeart;
        Optional <RecruitDibsEntity> isDib = recruitDibRepository.findByUser_IdAndRecruit_Id(userId, jobId);
        isHeart = isDib.isPresent();

        if(recruit != null){
            return ResRecruitDTO.toDetailDTO(recruit, like, isHeart);
        } else {
            return null;
        }
    }

    // 공고 수정
    public boolean editRecruit(int id, RecruitDTO recruitDTO, String fileURL, UserEntity user)  {
        // 해당 게시물 조회
        Optional<RecruitEntity> recruit = recruitRepository.findById(id);

        // 수정
        if(recruit.isPresent()) {
            RecruitEntity existingEntity = recruit.get();
            if (Objects.equals(existingEntity.getUser().getUserID(), user.getUserID())) {
                existingEntity.updateFields(recruitDTO, fileURL);
                recruitRepository.save(existingEntity);
                return true;
            }
            log.info("현재 로그인된 사용자와 게시물 작성자가 같지 않습니다.");
            return false;
        }
        return false;
    }

    // 공고 삭제
    public boolean deleteRecruit(int jobId, UserEntity user) {
        // 해당 게시물 조회
        Optional<RecruitEntity> recruit = recruitRepository.findById(jobId);

        // 삭제
        if (recruit.isPresent()) {
            if(Objects.equals(recruit.get().getUser().getUserID(), user.getUserID())){
                recruitRepository.deleteById(jobId);
                return true;
            }
            log.info("현재 로그인된 사용자와 게시물 작성자가 같지 않습니다.");
            return false;

        } else {
            return false;
        }
    }


    @Transactional
    public DibResult dib(int jobId, UserEntity userEntity) {
        RecruitEntity recruit = recruitRepository.findById(jobId).orElse(null);
        if (recruit == null) {
            return RECRUIT_NOT_FOUND;
        }
        Optional<RecruitDibsEntity> existingDib = recruitDibRepository.findByRecruitAndUser(recruit, userEntity);
        if (existingDib.isPresent()) {
            recruitDibRepository.delete(existingDib.get());
            return DIB_REMOVED;
        } else {
            RecruitDibsEntity dib = new RecruitDibsEntity(recruit, userEntity);
            recruitDibRepository.save(dib);
            return DIB_ADDED;
        }
    }

    public long countDibs(int bookId) {
        RecruitEntity recruit = recruitRepository.findById(bookId).orElse(null);
        if(recruit != null){
            return recruitDibRepository.countByRecruit(recruit);
        }else {
            return 0;
        }
    }

    // 마감 여부 변경
    public boolean updateRecruiting(int jobId, UserEntity user) {
        RecruitEntity recruit = recruitRepository.findById(jobId).orElse(null);
        if (recruit != null) {
            if(Objects.equals(recruit.getUser().getUserID(), user.getUserID())) {
                boolean result = !recruit.isRecruiting();
                recruit.setRecruiting(!recruit.isRecruiting());
                recruitRepository.save(recruit);
                return result;
            }
            throw new RuntimeException("로그인된 사용자와 게시물 작성자가 같지 않습니다.");
        } else {
            throw new RuntimeException("게시물이 존재하지 않습니다.");
        }
    }
}
