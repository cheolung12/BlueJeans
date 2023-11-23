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
    private int id;

    private String title;
    private UserEntity userId;
    private String content;
    private int money;
    private String region;
    private String contact;
    private Timestamp createdAt;
    private int like;


    public static RecruitEntity toEntity(RecruitDTO dto, UserEntity user, String fileURL){
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
                .img_path(fileURL)
                .build();
    }


}
