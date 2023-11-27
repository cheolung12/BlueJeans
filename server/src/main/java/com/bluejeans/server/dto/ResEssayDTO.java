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
    private String img_path;
    private long like;

    public static ResEssayDTO toDTO(EssayEntity entity, long like){
        if (entity == null) {
            return null;
        }
        return new ResEssayDTO().builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .user_id(entity.getUser() != null ? entity.getUser().getId() : null)
                .img_path(entity.getImg_path())
                .like(like)
                .build();
    }



}
