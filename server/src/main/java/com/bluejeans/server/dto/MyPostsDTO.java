package com.bluejeans.server.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPostsDTO {
    private String type;
    private int id;
    private String title;
    private String img_path;
//    private String content;
    private Timestamp createdAt;
}
