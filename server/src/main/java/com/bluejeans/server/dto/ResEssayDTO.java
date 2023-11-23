package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResEssayDTO {
    private int id;

    private String title;
    private String content;
    private int user_id;
    private String imp_path;

    public static ResEssayDTO toDTO(EssayEntity entity){
        if (entity == null) {
            return null;
        }
        return new ResEssayDTO().builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .user_id(entity.getUser() != null ? entity.getUser().getId() : null)
                .imp_path(entity.getImg_path())
                .build();
    }



}
