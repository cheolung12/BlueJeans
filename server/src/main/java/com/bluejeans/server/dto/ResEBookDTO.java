package com.bluejeans.server.dto;

import com.bluejeans.server.entity.EBookEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResEBookDTO {
    private int id;
    private String title;
    private String author;
    private String publisher;
    private String genre;
    private String ISBN;
    private String description;
    private String thumbnail;
    private Timestamp createdAt;
    private long like;

    public static ResEBookDTO toDTO(EBookEntity entity, long like){
        if (entity == null) {
            return null;
        }
        return new ResEBookDTO().builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .author(entity.getAuthor())
                .publisher(entity.getPublisher())
                .genre(entity.getGenre())
                .ISBN(entity.getISBN())
                .description(entity.getDescription())
                .thumbnail(entity.getThumbnail())
                .createdAt(entity.getCreated_at())
                .like(like)
                .build();
    }

}
