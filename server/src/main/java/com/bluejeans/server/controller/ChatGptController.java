package com.bluejeans.server.controller;

import com.bluejeans.server.dto.ChatGptResponseDTO;
import com.bluejeans.server.dto.ChatGptQuestionRequestDTO;
import com.bluejeans.server.service.ChatGptService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
//@CrossOrigin(origins = "http://localhost:3000")
public class ChatGptController {

    private final ChatGptService chatGptService;

    // 생성자 주입을 통해 ChatGptService 의존성 주입
    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    // 사용자 대화 답변
    @PostMapping("/question")
    public ChatGptResponseDTO sendQuestion(@RequestBody ChatGptQuestionRequestDTO requestDto) {
        // ChatGptService를 통해 질문에 대한 응답을 얻어온다.
        return chatGptService.askQuestion(requestDto);
    }
}