package com.bluejeans.server.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class ChatGptConfig {
    public static final String AUTHORIZATION = "Authorization";
    public static final String BEARER = "Bearer ";

    @Value("${OPEN_AI_API_KEY}")
    private String API_KEY;
    @Value("${OPEN_AI_API_MODEL}")
    private String MODEL;
    @Value("${OPEN_AI_API_MAX_TOKEN}")
    private Integer MAX_TOKEN;
    @Value("${OPEN_AI_API_TEMPERATURE}")
    private Double TEMPERATURE;
    @Value("${OPEN_AI_API_TOP_P}")
    private Double TOP_P;
    @Value("${OPEN_AI_API_MEDIA_TYPE}")
    private String MEDIA_TYPE;
    @Value("${OPEN_AI_API_URL}")
    private String URL;
}