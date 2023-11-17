package com.bluejeans.server.dto;

import com.bluejeans.server.entity.RecruitEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecruitDTO {
    private int id;

    private String title;
    private String content;
    private int money;
    private String region;
    private String contact;
    private Timestamp createdAt;

    public static RecruitDTO toDTO(RecruitEntity entity){
        if(entity == null){
            return null;
        }

        return RecruitDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .money(entity.getMoney())
                .region(entity.getRegion())
                .contact(entity.getContact())
                .createdAt(entity.getCreated_at())
                .build();
    }

    public static RecruitEntity toEntity(RecruitDTO dto){
        if (dto == null) {
            return null;
        }
        return RecruitEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .money(dto.getMoney())
                .region(dto.getRegion())
                .contact(dto.getContact())
                .build();
    }


}
