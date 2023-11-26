package com.bluejeans.server.config;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class SessionFilter extends UsernamePasswordAuthenticationFilter {

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);

        // 여기서 세션 쿠키를 설정하고 프론트엔드로 전달하는 로직을 추가
        // 예시: 세션 아이디를 쿠키에 설정
        String sessionId = request.getSession().getId();
        Cookie cookie = new Cookie("JSESSIONID", sessionId);
        cookie.setPath("/");  // 루트 경로로 설정하여 전체 애플리케이션에서 접근 가능하게 함
        cookie.setSecure(true);
//        cookie.setDomain("https://www.bluejeansu.site");
        cookie.setDomain("http://localhost:3000");
        response.addCookie(cookie);
    }
}
