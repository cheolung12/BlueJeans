package com.bluejeans.server.service;

import com.bluejeans.server.dto.EssayDTO;
import com.bluejeans.server.dto.ResEssayDTO;
import com.bluejeans.server.entity.DibResult;
import com.bluejeans.server.entity.EssayDibsEntity;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import com.bluejeans.server.repository.EssayDibRepository;
import com.bluejeans.server.repository.EssayRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.bluejeans.server.entity.DibResult.DIB_ADDED;
import static com.bluejeans.server.entity.DibResult.DIB_REMOVED;
import static com.bluejeans.server.entity.DibResult.ESSAY_NOT_FOUND;

@Service
@Slf4j
public class EssayService {
    @Autowired
    EssayRepository essayRepository;

    @Autowired
    EssayDibRepository essayDibRepository;

    @Autowired
    S3Uploader s3Uploader;


    //모든 에세이 리스트 반환
    public List<ResEssayDTO> findAll() {
        List<EssayEntity> essayList = essayRepository.findAll();
        List<ResEssayDTO> list = new ArrayList<>();
        log.info("전체찾기 서비스");

        for( EssayEntity essay : essayList){
            list.add(ResEssayDTO.toDTO(essay));
        }
        return list;
    }

    public EssayEntity addEssay(EssayDTO essayDTO, UserEntity user, MultipartFile multipartFile) throws IOException {
        String fileURL;
        if(multipartFile!=null){
            fileURL = s3Uploader.upload(multipartFile, "essay");
        }else{
            fileURL = null;
        }
        EssayEntity newEssay = EssayDTO.toEntity(essayDTO, user, fileURL);
        return essayRepository.save(newEssay);
    }

    public ResEssayDTO essayDetail(int essayId) {
        Optional<EssayEntity> result = essayRepository.findById(essayId);

        if (result.isPresent()) {
            ResEssayDTO essay = ResEssayDTO.toDTO(result.get());
            return essay;
        } else {
            return null;
        }
    }

    public boolean edit(int essayId, MultipartFile multipartFile, EssayDTO essayDTO) throws IOException {
        //해당 게시물 조회
        Optional<EssayEntity> essay = essayRepository.findById(essayId);
        String fileURL = s3Uploader.upload(multipartFile, "essays");
        //수정
        if(essay.isPresent()){
            EssayEntity existingEntity = essay.get();
            existingEntity.updateFields(essayDTO,fileURL);
            essayRepository.save(existingEntity);
            return  true;
        }else {
            return false;
        }

    }

    public void essayDelete(int essayId) {
        Optional<EssayEntity> essay = essayRepository.findById(essayId);
        essay.ifPresent(essayRepository::delete);
    }


    @Transactional
    public DibResult dib(int essayId, UserEntity userEntity) {
        EssayEntity essay = essayRepository.findById(essayId).orElse(null);
        if (essay == null) {
            return ESSAY_NOT_FOUND;
        }
        Optional<EssayDibsEntity> existingDib = essayDibRepository.findByEssayAndUser(essay, userEntity);
        if (existingDib.isPresent()) {
            // 이미 존재하면 삭제
            essayDibRepository.delete(existingDib.get());
            return DIB_REMOVED;
        } else {
            // 존재하지 않으면 추가
            EssayDibsEntity dib = new EssayDibsEntity(essay, userEntity);
            essayDibRepository.save(dib);
            return DIB_ADDED;
        }
    }

    public long countDibs(int essayId) {
        EssayEntity essay = essayRepository.findById(essayId).orElse(null);
        if(essay!= null){
            return essayDibRepository.countByEssay(essay);
        }else {
            return 0;
        }
    }




}
