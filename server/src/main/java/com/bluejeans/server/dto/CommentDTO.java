package com.bluejeans.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
//    private String writer_id;
//    private String essay_id;
    private String comment;

}
