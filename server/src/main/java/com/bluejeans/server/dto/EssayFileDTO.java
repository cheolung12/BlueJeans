package com.bluejeans.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EssayFileDTO {
    private int id;
    private String path;
    private int essay_id;
}
