package com.bluejeans.server.service;

import com.bluejeans.server.dto.EssayDTO;
import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.RecruitEntity;
import com.bluejeans.server.repository.RecruitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecruitService {

    @Autowired
    private RecruitRepository recruitRepository;

    // 엔티티 리스트를 DTO리스트로
    private List<RecruitDTO> entityListToDTOList(List<RecruitEntity> recruitList) {
        List<RecruitDTO> result = new ArrayList<>();
        if (recruitList.isEmpty()) {
            return result;
        }
        // 엔티티 -> DTO
        for (RecruitEntity recruit : recruitList) {
            result.add(RecruitDTO.toDTO(recruit));
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

    public boolean registerRecruit(RecruitDTO recruitDTO) {
        // DTO -> 엔티티
        RecruitEntity added = RecruitDTO.toEntity(recruitDTO);

        try {
            recruitRepository.save(added);
            return true;
        } catch (Exception e) {
            // 추후 AOP를 통해 에러로그
            System.out.println("공고 등록 실패!: " + e.getMessage());
            return false;
        }
    }

    public RecruitDTO recruitDetail(int id) {
        Optional<RecruitEntity> recruit = recruitRepository.findById(id);
        return recruit.map(RecruitDTO::toDTO).orElse(null);
    }

    public boolean editRecruit(int id, RecruitDTO recruitDTO) {
        // 해당 게시물 조회
        Optional<RecruitEntity> recruit = recruitRepository.findById(id);
        // 수정
        if(recruit.isPresent()) {
            RecruitEntity existingEntity = recruit.get();  // 가져오기
            existingEntity.updateFields(recruitDTO);  // 업데이트
            recruitRepository.save(existingEntity);  // 저장

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

}
