package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayEntity;
import com.bluejeans.server.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Time;
import java.sql.Timestamp;

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
    private Timestamp created_at;
    private Timestamp updated_at;

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
                .created_at(entity.getCreated_at())
                .updated_at(entity.getUpdated_at())
                .build();
    }



}
