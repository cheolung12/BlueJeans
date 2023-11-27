package com.bluejeans.server.service;

import com.bluejeans.server.dto.CommentDTO;
import com.bluejeans.server.dto.EssayDTO;
import com.bluejeans.server.dto.ResCommentDTO;
import com.bluejeans.server.dto.ResEssayDTO;
import com.bluejeans.server.entity.*;
import com.bluejeans.server.repository.EssayCommentsRepository;
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
    EssayCommentsRepository essayCommentsRepository;

    @Autowired
    S3Uploader s3Uploader;


    //모든 에세이 리스트 반환
    public List<ResEssayDTO> findAll() {
        List<EssayEntity> essayList = essayRepository.findAll();
        List<ResEssayDTO> list = new ArrayList<>();
        log.info("전체찾기 서비스");

        for( EssayEntity essay : essayList){
            long like = essayDibRepository.countByEssay(essay);
            list.add(ResEssayDTO.toDTO(essay, like));
        }
        return list;
    }

    public EssayEntity addEssay(EssayDTO essayDTO, UserEntity user, String fileURL)  {
        EssayEntity newEssay = EssayDTO.toEntity(essayDTO, user, fileURL);
        return essayRepository.save(newEssay);
    }

    public ResEssayDTO essayDetail(int essayId) {
        Optional<EssayEntity> result = essayRepository.findById(essayId);

        if (result.isPresent()) {
            long like = essayDibRepository.countByEssay(result.get());
            ResEssayDTO essay = ResEssayDTO.toDTO(result.get(), like);
            return essay;
        } else {
            return null;
        }
    }


    public boolean edit(int essayId, String fileURL, EssayDTO essayDTO) {
        //해당 게시물 조회
        Optional<EssayEntity> essay = essayRepository.findById(essayId);
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


    public List<ResCommentDTO> essayComments(int essayId) {
        List<EssayCommentsEntity> comments = essayCommentsRepository.findByEssayId(essayId);
        List<ResCommentDTO> resCommentDTOS = new ArrayList<>();
        for(EssayCommentsEntity comment : comments){
            resCommentDTOS.add(ResCommentDTO.toDTO(comment));
        }
        return resCommentDTOS;
    }

    public boolean addComment(int essayId, CommentDTO commentDTO, UserEntity user) {
        EssayEntity essay = essayRepository.findById(essayId).orElse(null);
        if(essay!=null) {
            EssayCommentsEntity entity = new EssayCommentsEntity().builder()
                    .comment(commentDTO.getComment())
                    .essay(essay)
                    .user(user)
                    .build();

            essayCommentsRepository.save(entity);
            return true;
        }else{
            return false;
        }

    }

    public boolean deleteComment(int commentId, UserEntity user) {
        EssayCommentsEntity comment = essayCommentsRepository.findById(commentId).orElse(null);
        if(comment != null){
            if(comment.getUser().getId() != user.getId()){
                System.out.println(comment.getUser().getId());
                System.out.println(user.getId());
                System.out.println("본인이 쓴 댓글이 아닙니다.");
                return false;
            }
            essayCommentsRepository.delete(comment);
            return true;
        }
        return false;
    }
}
