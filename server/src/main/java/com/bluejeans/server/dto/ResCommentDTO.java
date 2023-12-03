package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EssayCommentsEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResCommentDTO {
    private String nickname;
    private String comment;

    public static ResCommentDTO toDTO(EssayCommentsEntity comments){
        return new ResCommentDTO().builder()
                .nickname(comments.getUser().getNickname())
                .comment(comments.getComment())
                .build();
    }
}
