package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayCommentsEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResCommentDTO {
    private int id;
    private String writer_id;
    private String essay_id;
    private String comment;
    private Timestamp created_at;
    private String writer_img;

    public static ResCommentDTO toDTO(EssayCommentsEntity entity){
        if (entity ==null){
            return null;
        }
        return new ResCommentDTO().builder()
                .id(entity.getId())
                .comment(entity.getComment())
                .writer_id(entity.getUser().getUserID())
                .created_at(entity.getCreated_at())
                .writer_img(entity.getUser().getImg_path())
                .build();
    }

}
