package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayCommentsEntity;
import com.bluejeans.server.entity.EssayEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResEssayDetailDTO {
    private int id;

    private String title;
    private String content;
    private int user_id;
    private String img_path;
    private long like;
    private Timestamp created_at;
    private Timestamp updated_at;
    private List<EssayCommentsEntity> comments;

    public static ResEssayDetailDTO toDTO(EssayEntity entity, long like, List<EssayCommentsEntity> comments){
        if (entity == null) {
            return null;
        }
        return new ResEssayDetailDTO().builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .user_id(entity.getUser() != null ? entity.getUser().getId() : null)
                .img_path(entity.getImg_path())
                .like(like)
                .created_at(entity.getCreated_at())
                .updated_at(entity.getUpdated_at())
                .comments(comments)
                .build();
    }



}
