package com.bluejeans.server.dto;

import com.bluejeans.server.entity.RecruitEntity;
//import com.bluejeans.server.entity.RecruitFileEntity;
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

    public static ResRecruitDTO toDTO(RecruitEntity rcEntity, int like){

        return ResRecruitDTO.builder()
                .id(rcEntity.getId())
                .userId(rcEntity.getUserId())
                .title(rcEntity.getTitle())
                .content(rcEntity.getContent())
                .money(rcEntity.getMoney())
                .region(rcEntity.getRegion())
                .contact(rcEntity.getContact())
                .createdAt(rcEntity.getCreated_at())
                .img_path(rcEntity.getImg_path())
                .like(like)
                .build();
    }



}
