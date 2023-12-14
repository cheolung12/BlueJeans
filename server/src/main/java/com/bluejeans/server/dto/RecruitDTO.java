package com.bluejeans.server.dto;

import com.bluejeans.server.entity.RecruitEntity;
//import com.bluejeans.server.entity.RecruitFileEntity;
import com.bluejeans.server.entity.UserEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecruitDTO {
    private String title;
    private String content;
    private String moneyStandard;
    private int money;
    private String region;
    private String contact;
    private String workDay;
    private String workTime;


    public static RecruitEntity toEntity(RecruitDTO dto, UserEntity user, String fileURL){
        if (dto == null) {
            return null;
        }
        return RecruitEntity.builder()
                .user(user)
                .title(dto.getTitle())
                .content(dto.getContent())
                .moneyStandard(dto.getMoneyStandard())
                .money(dto.getMoney())
                .region(dto.getRegion())
                .contact(dto.getContact())
                .workDay(dto.getWorkDay())
                .workTime(dto.getWorkTime())
                .img_path(fileURL)
                .recruiting(true)
                .build();
    }


}
