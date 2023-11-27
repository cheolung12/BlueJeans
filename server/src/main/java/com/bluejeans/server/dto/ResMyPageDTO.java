package com.bluejeans.server.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResMyPageDTO {

    private String nickname;
    private String address;
    private List<ResRecruitDTO> MyRecruitList;
    private List<ResEssayDTO> MyEssayList;
    private List<ResEBookDTO> MyEBookList;

}
