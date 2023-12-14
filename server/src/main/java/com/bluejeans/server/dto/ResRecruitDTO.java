package com.bluejeans.server.dto;

import com.bluejeans.server.entity.RecruitEntity;
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
    private String nickname;
    private String content;
    private String moneyStandard;
    private int money;
    private String region;
    private String contact;
    private String workDay;
    private String workTime;
    private Timestamp createdAt;
    private String img_path;
    private boolean recruiting;
    private int like;
    private boolean isHeart;

    public static ResRecruitDTO toDTO(RecruitEntity rcEntity, int like){

        return ResRecruitDTO.builder()
                .id(rcEntity.getId())
                .nickname(rcEntity.getUser().getNickname())
                .title(rcEntity.getTitle())
                .content(rcEntity.getContent())
                .moneyStandard(rcEntity.getMoneyStandard())
                .money(rcEntity.getMoney())
                .region(rcEntity.getRegion())
                .contact(rcEntity.getContact())
                .workDay(rcEntity.getWorkDay())
                .workTime(rcEntity.getWorkTime())
                .createdAt(rcEntity.getCreated_at())
                .img_path(rcEntity.getImg_path())
                .recruiting(rcEntity.isRecruiting())
                .like(like)
                .build();
    }

    public static ResRecruitDTO toDetailDTO(RecruitEntity rcEntity, int like, boolean isHeart){

        return ResRecruitDTO.builder()
                .id(rcEntity.getId())
                .nickname(rcEntity.getUser().getNickname())
                .title(rcEntity.getTitle())
                .content(rcEntity.getContent())
                .moneyStandard(rcEntity.getMoneyStandard())
                .money(rcEntity.getMoney())
                .region(rcEntity.getRegion())
                .contact(rcEntity.getContact())
                .workDay(rcEntity.getWorkDay())
                .workTime(rcEntity.getWorkTime())
                .createdAt(rcEntity.getCreated_at())
                .img_path(rcEntity.getImg_path())
                .recruiting(rcEntity.isRecruiting())
                .like(like)
                .isHeart(isHeart)
                .build();
    }



}
