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

@Service
public class RecruitService {

    @Autowired
    private RecruitRepository recruitRepository;

    public List<RecruitDTO> findAll() {
        List<RecruitEntity> recruitList = recruitRepository.findAll();
        List<RecruitDTO> result = new ArrayList<>();
        if(recruitList.isEmpty()){
            return null;
        }
        // 엔티티 -> DTO
        for(RecruitEntity recruit : recruitList){
            result.add(RecruitDTO.toDTO(recruit));
        }
        return result;
    }
}
