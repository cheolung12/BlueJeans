package com.bluejeans.server.dto;

import com.bluejeans.server.entity.RecruitEntity;
import com.bluejeans.server.entity.RecruitFileEntity;
import com.bluejeans.server.entity.UserEntity;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResRecruitDTO {
    private int id;

    private String title;
    private UserEntity userId;
    private String content;
    private int money;
    private String region;
    private String contact;
    private Timestamp createdAt;
    private String img_path;
    private int like;

    //1. 파일형태로 다 받아보기
    //2. 안되는 경우에는 엔티티는 string으로 수정
    public static ResRecruitDTO toDTO(RecruitEntity rcEntity, RecruitFileEntity fileEntity, int like){

        return ResRecruitDTO.builder()
                .id(rcEntity.getId())
                .userId(rcEntity.getUserId())
                .title(rcEntity.getTitle())
                .content(rcEntity.getContent())
                .money(rcEntity.getMoney())
                .region(rcEntity.getRegion())
                .contact(rcEntity.getContact())
                .createdAt(rcEntity.getCreated_at())
                .img_path(fileEntity.getImg_path())  // dto는 file형태로 받고, entity는 string이라 변환 불가
                .like(like)
                .build();
    }



}
