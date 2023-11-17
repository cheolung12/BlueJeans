package com.bluejeans.server.dto;

import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
public class ChatGptQuestionRequestDTO implements Serializable {
    // 사용자에게 받는 값
    private String question;
    // 상수로 추가 문장 정의
    private static final String ADDITIONAL_SENTENCE = "너는 일상 대화형 챗봇이야. 주어진 대화에 맞춰서 반말로 답변을 해줘 답변은 한 문장이어야해";
    // 이전 답변 리스트
    private List<String> previousConversation;

    public String getAdditionalSentence() {
        return ADDITIONAL_SENTENCE;
    }

    // 리스트 null 처리
    public List<String> getPreviousConversation() {
        return previousConversation != null ? new ArrayList<>(previousConversation) : new ArrayList<>();
    }
}
