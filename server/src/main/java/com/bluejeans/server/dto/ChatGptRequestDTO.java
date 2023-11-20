package com.bluejeans.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class ChatGptRequestDTO implements Serializable {
    // GPT 모델 식별자
    private String model;
    // 생성할 문장의 시작 부분
    private String prompt;
    // 생성할 토큰의 최대 수
    @JsonProperty("max_tokens")
    private Integer maxTokens;
    // 문장 생성 시 온도(다양성 조절)
    private Double temperature;
    // Top-p sampling의 확률 값
    @JsonProperty("top_p")
    private Double topP;

    @Builder
    public ChatGptRequestDTO(String model, String prompt,
                             Integer maxTokens, Double temperature,
                             Double topP) {
        this.model = model;
        this.prompt = prompt;
        this.maxTokens = maxTokens;
        this.temperature = temperature;
        this.topP = topP;
    }
}