package com.bluejeans.server.service;

import com.bluejeans.server.dto.DibResultDTO;
import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.dto.ResRecruitDTO;
import com.bluejeans.server.entity.*;
import com.bluejeans.server.repository.RecruitDibRepository;
//import com.bluejeans.server.repository.RecruitFileRepository;
import com.bluejeans.server.repository.RecruitRepository;
import com.bluejeans.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.bluejeans.server.entity.DibResult.*;

@Service
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
        RecruitEntity recruit = recruitRepository.findById(id).orElse(null);
        int like = recruitDibRepository.countByRecruit(recruit);
        if(recruit != null){
            return ResRecruitDTO.toDTO(recruit, like);
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

    public boolean updateRecruiting(int jobId) {
        RecruitEntity recruit = recruitRepository.findById(jobId).orElse(null);
        if (recruit != null) {
            recruit.setRecruiting(!recruit.isRecruiting());
            recruitRepository.save(recruit);
            return true;
        } else {
            return false;
        }
    }
}
