package com.bluejeans.server.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResMyPageDTO {

    private String userId;
    private String nickname;
    private String address;
    private String img_path;
    private List<MyPostsDTO> likedPost;
    private List<MyPostsDTO> writedPost;
}
