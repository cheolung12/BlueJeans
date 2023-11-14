package com.bluejeans.server.controller;

import com.bluejeans.server.dto.ChatGptResponseDto;
import com.bluejeans.server.dto.QuestionRequestDto;
import com.bluejeans.server.service.ChatGptService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat-gpt")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatGptController {

    private final ChatGptService chatGptService;

    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @PostMapping("/question")
    public ChatGptResponseDto sendQuestion(@RequestBody QuestionRequestDto requestDto) {
        return chatGptService.askQuestion(requestDto);
    }
}