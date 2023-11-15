package com.bluejeans.server.service;

import com.bluejeans.server.dto.EssayDTO;
import com.bluejeans.server.dto.UserDTO;
//import com.bluejeans.server.entity.EssayDibsEntity;
import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
//import com.bluejeans.server.repository.EssayDibRepository;
import com.bluejeans.server.repository.EssayRepository;
import com.bluejeans.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class EssayService {
    @Autowired
    EssayRepository essayRepository;

//    @Autowired
//    EssayDibRepository essayDibRepository;


    //모든 에세이 리스트 반환
    public List<EssayDTO> findAll() {
        List<EssayEntity> essayList = essayRepository.findAll();
        List<EssayDTO> list = new ArrayList<>();
        log.info("전체찾기 서비스");

        for( EssayEntity essay : essayList){
            list.add(EssayDTO.essayEntityToDTO(essay));
        }
        return list;
    }

    public EssayEntity addEssay(EssayDTO essayDTO, UserEntity user) {
        EssayEntity newEssay = EssayDTO.essayDTOToEntity(essayDTO, user);
        return essayRepository.save(newEssay);
    }

    public EssayDTO essayDetail(int essayId) {
        Optional<EssayEntity> result = essayRepository.findById(essayId);

        if (result.isPresent()) {
            EssayDTO essay = EssayDTO.essayEntityToDTO(result.get());
            return essay;
        } else {
            return null;
        }
    }

    public void edit(int essayId,String title, String content) {

        essayRepository.patch(essayId,title,content);

    }

    public void essayDelete(int essayId) {
        Optional<EssayEntity> essay = essayRepository.findById(essayId);
        essay.ifPresent(essayRepository::delete);
    }

//    public void dib(int essayId, UserDTO userdto) {
//        EssayEntity essay = essayRepository.findById(essayId).orElse(null);
//        UserEntity user = UserDTO.userDtoToEntity(userdto);
//        EssayDibsEntity dib = new EssayDibsEntity(essay,user);
//        essayDibRepository.save(dib);
//    }
}
