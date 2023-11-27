package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EssayDTO {
    private int id;

    private String title;
    private String content;
    private int user_id;



    public static EssayEntity toEntity(EssayDTO dto, UserEntity user, String fileURL){
        if (dto == null) {
            return null;
        }
        return new EssayEntity().builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(user)
                .img_path(fileURL)
                .build();
    }


}
