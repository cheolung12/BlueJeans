package com.bluejeans.server.service;

import com.bluejeans.server.config.ChatGptConfig;
import com.bluejeans.server.dto.ChatGptRequestDto;
import com.bluejeans.server.dto.ChatGptResponseDto;
import com.bluejeans.server.dto.QuestionRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGptService {

    @Autowired
    private ChatGptConfig chatGptConfig;

    private static RestTemplate restTemplate = new RestTemplate();

    public HttpEntity<ChatGptRequestDto> buildHttpEntity(ChatGptRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(chatGptConfig.getMEDIA_TYPE()));
        headers.add(ChatGptConfig.AUTHORIZATION, ChatGptConfig.BEARER + chatGptConfig.getAPI_KEY());
        return new HttpEntity<>(requestDto, headers);
    }

    public ChatGptResponseDto getResponse(HttpEntity<ChatGptRequestDto> chatGptRequestDtoHttpEntity) {
        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(
                chatGptConfig.getURL(),
                chatGptRequestDtoHttpEntity,
                ChatGptResponseDto.class);

        return responseEntity.getBody();
    }

    public ChatGptResponseDto askQuestion(QuestionRequestDto requestDto) {
        return this.getResponse(
                this.buildHttpEntity(
                        new ChatGptRequestDto(
                                chatGptConfig.getMODEL(),
                                requestDto.getQuestion(),
                                chatGptConfig.getMAX_TOKEN(),
                                chatGptConfig.getTEMPERATURE(),
                                chatGptConfig.getTOP_P()
                        )
                )
        );
    }
}