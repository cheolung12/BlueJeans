package com.bluejeans.server.controller;

import com.bluejeans.server.dto.ChatGptResponseDTO;
import com.bluejeans.server.dto.ChatGptQuestionRequestDTO;
import com.bluejeans.server.service.ChatGptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "ChatBot API", description = "챗봇 관련 API 입니다.")
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatGptController {

    private final ChatGptService chatGptService;

    // 생성자 주입을 통해 ChatGptService 의존성 주입
    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    // 사용자 대화 답변
    @Operation(summary = "메세지 전송", description = "챗봇에게 메세지를 전송하고 답변을 받습니다.")
    @Parameter(name = "requestDTO", description = "이전 대화 목록 일부 + 사용자에게 받는 채팅 + 정의해놓은 추가 명령")
    @PostMapping("/question")
    public ChatGptResponseDTO sendQuestion(@RequestBody ChatGptQuestionRequestDTO requestDto) {
        // ChatGptService를 통해 질문에 대한 응답을 얻어온다.
        return chatGptService.askQuestion(requestDto);
    }
}