package com.bluejeans.server.dto;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class QuestionRequestDto implements Serializable {
    // 사용자에게 받는 값
    private String question;
    // 상수로 추가 문장 정의
    private static final String ADDITIONAL_SENTENCE = "일상 대화처럼 반말을 사용하고 한 문장으로 답해줘(100토큰 이내로)";

    public String getAdditionalSentence() {
        return ADDITIONAL_SENTENCE;
    }
}
