package com.bluejeans.server.dto;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class QuestionRequestDto implements Serializable {
    // 사용자에게 받는 값
    private String question;
}
