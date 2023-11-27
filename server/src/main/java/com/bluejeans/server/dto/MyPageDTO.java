package com.bluejeans.server.dto;

import com.bluejeans.server.entity.UserEntity;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPageDTO {

    private String nickname;
    private String address;
    private List<ResRecruitDTO> MyRecruitList;
    private List<ResEssayDTO> MyEssayList;
    private List<ResEBookDTO> MyEBookList;

}
