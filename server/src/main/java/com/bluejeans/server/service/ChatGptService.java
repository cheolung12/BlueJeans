package com.bluejeans.server.service;

import com.bluejeans.server.config.ChatGptConfig;
import com.bluejeans.server.dto.ChatGptRequestDTO;
import com.bluejeans.server.dto.ChatGptResponseDTO;
import com.bluejeans.server.dto.ChatGptQuestionRequestDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Slf4j
public class ChatGptService {

    @Autowired
    private ChatGptConfig chatGptConfig;

    // RestTemplate 인스턴스 생성
    // RestTemplate는 Spring에서 제공하는 클래스로 HTTP 작업을 간편하게 처리할 수 있게 도와줌
    // static을 활용하여 하나의 인스턴스로 공유
    private static RestTemplate restTemplate = new RestTemplate();

    // HTTP 요청을 위한 HttpEntity 생성
    public HttpEntity<ChatGptRequestDTO> buildHttpEntity(ChatGptRequestDTO requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(chatGptConfig.getMEDIA_TYPE()));
        headers.add(ChatGptConfig.AUTHORIZATION, ChatGptConfig.BEARER + chatGptConfig.getAPI_KEY());
        return new HttpEntity<>(requestDto, headers);
    }

    // GPT 모델로부터 응답을 받아오는 메서드
    // ResponseEntity를 사용하여 받아온다
    public ChatGptResponseDTO getResponse(HttpEntity<ChatGptRequestDTO> chatGptRequestDtoHttpEntity) {
        ResponseEntity<ChatGptResponseDTO> responseEntity = restTemplate.postForEntity(
                chatGptConfig.getURL(),
                chatGptRequestDtoHttpEntity,
                ChatGptResponseDTO.class);

        return responseEntity.getBody();
    }

    // 응답을 받아오는 일련의 과정 수행
    public ChatGptResponseDTO askQuestion(ChatGptQuestionRequestDTO requestDto) {

        StringBuilder combinedQuestion = new StringBuilder();
        List<String> previousConversation = requestDto.getPreviousConversation();
        combinedQuestion.append(requestDto.getAdditionalSentence()).append("\n");
        // 질문과 답변 분리
        for (int i = 0; i < previousConversation.size(); i++) {
            System.out.println(previousConversation.get(i));
            if (i % 2 == 0) {
                combinedQuestion.append("Q: ").append(previousConversation.get(i)).append("\n");
            } else {
                combinedQuestion.append("A: ").append(previousConversation.get(i)).append("\n");
            }
        }
        combinedQuestion.append("Q: ").append(requestDto.getQuestion());

        String finalCombinedQuestion = combinedQuestion.toString();
        // 완성된 입력 값 출력
        log.info("입력 값: {}", finalCombinedQuestion);

        return this.getResponse(
                this.buildHttpEntity(
                        new ChatGptRequestDTO(
                                chatGptConfig.getMODEL(),
                                finalCombinedQuestion,
                                chatGptConfig.getMAX_TOKEN(),
                                chatGptConfig.getTEMPERATURE(),
                                chatGptConfig.getTOP_P()
                        )
                )
        );
    }
}