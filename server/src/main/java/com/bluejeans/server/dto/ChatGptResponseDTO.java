package com.bluejeans.server.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class ChatGptResponseDTO implements Serializable {
    // ChatGptResponseDto의 고유 식별자
    private String id;
    // 객체의 유형을 나타내는 문자열
    private String object;
    // 생성일자
    private LocalDate created;
    // GPT 모델 식별자
    private String model;
    // 선택지 목록
    private List<ChatGptChoiceDTO> choices;

    @Builder
    public ChatGptResponseDTO(String id, String object,
                              LocalDate created, String model,
                              List<ChatGptChoiceDTO> choices) {
        this.id = id;
        this.object = object;
        this.created = created;
        this.model = model;
        this.choices = choices;
    }
}