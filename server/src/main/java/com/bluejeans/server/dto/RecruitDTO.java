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
public class RecruitDTO {
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

    public static RecruitDTO toDTO(RecruitEntity rcEntity, RecruitFileEntity fileEntity, int like){

        return RecruitDTO.builder()
                .id(rcEntity.getId())
                .userId(rcEntity.getUserId())
                .title(rcEntity.getTitle())
                .content(rcEntity.getContent())
                .money(rcEntity.getMoney())
                .region(rcEntity.getRegion())
                .contact(rcEntity.getContact())
                .createdAt(rcEntity.getCreated_at())
                .img_path(fileEntity.getImg_path())
                .like(like)
                .build();
    }

    public static RecruitEntity toEntity(RecruitDTO dto, UserEntity user){
        if (dto == null) {
            return null;
        }
        return RecruitEntity.builder()
                .userId(user)
                .title(dto.getTitle())
                .content(dto.getContent())
                .money(dto.getMoney())
                .region(dto.getRegion())
                .contact(dto.getContact())
                .build();
    }


}
