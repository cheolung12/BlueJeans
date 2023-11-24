package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EBookContentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResEBookContentDTO {
    private int book_id;
    private String title;
    private String content;

    public static ResEBookContentDTO toDTO(EBookContentEntity entity, String title){
        if (entity == null || title == null) {
            return null;
        }
        return new ResEBookContentDTO().builder()
                .book_id(entity.getBook_id())
                .title(title)
                .content(entity.getContent())
                .build();
    }
}
