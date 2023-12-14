package com.bluejeans.server.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResMainDTO {
    private List<ResRecruitDTO> RecruitList;
    private List<ResEssayDTO> EssayList;
    private List<ResEBookDTO> EBookList;
}
