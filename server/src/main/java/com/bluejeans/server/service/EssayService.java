package com.bluejeans.server.service;

import com.bluejeans.server.dto.*;
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
            List<EssayCommentsEntity> comments = essayCommentsRepository.findByEssayId(essay.getId());
            list.add(ResEssayDTO.toDTOessay(essay, like, comments.size()));
        }
        return list;
    }

    public EssayEntity addEssay(EssayDTO essayDTO, UserEntity user, String fileURL)  {
        EssayEntity newEssay = EssayDTO.toEntity(essayDTO, user, fileURL);
        return essayRepository.save(newEssay);
    }


    //로그인 되어있을때
    public ResEssayDetailDTO essayDetailisLogin(int essayId, UserEntity user) {
        Optional<EssayEntity> result = essayRepository.findById(essayId);

        //댓글조회
        List<EssayCommentsEntity> essaycomments = essayCommentsRepository.findByEssayId(essayId);
        List<ResCommentDTO> commentDTOS = new ArrayList<>();
        for(EssayCommentsEntity comment : essaycomments){
            commentDTOS.add(ResCommentDTO.toDTO(comment));
        }
        boolean isHeart;
        Optional<EssayDibsEntity> isDib = essayDibRepository.findByUser_IdAndEssay_Id(user.getId(), essayId);
        isHeart = isDib.isPresent();

        if (result.isPresent()) {
            long like = essayDibRepository.countByEssay(result.get());
            ResEssayDetailDTO essay = ResEssayDetailDTO.toDTO2(result.get(), like, commentDTOS, isHeart);
            return essay;
        } else {
            return null;
        }
    }
    //로그인 안되어있을때
    public ResEssayDetailDTO essayDetail(int essayId) {
        Optional<EssayEntity> result = essayRepository.findById(essayId);
        //댓글조회
        List<EssayCommentsEntity> essaycomments = essayCommentsRepository.findByEssayId(essayId);
        List<ResCommentDTO> commentDTOS = new ArrayList<>();
        for(EssayCommentsEntity comment : essaycomments){
            commentDTOS.add(ResCommentDTO.toDTO(comment));
        }


        if (result.isPresent()) {
            long like = essayDibRepository.countByEssay(result.get());
            System.out.println(result.get().getUser().getUserID());
            System.out.println(result.get().getUser().getImg_path());
            ResEssayDetailDTO essay = ResEssayDetailDTO.toDTO(result.get(), like, commentDTOS);
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

    @Transactional
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

    public boolean addComment(int essayId, CommentDTO comment, UserEntity user) {
        EssayEntity essay = essayRepository.findById(essayId).orElse(null);
        if(essay!=null) {
            EssayCommentsEntity entity = new EssayCommentsEntity().builder()
                    .comment(comment.getComment())
                    .essay(essay)
                    .user(user)
                    .build();

            essayCommentsRepository.save(entity);
            return true;
        }else{
            return false;
        }

    }

    @Transactional
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
