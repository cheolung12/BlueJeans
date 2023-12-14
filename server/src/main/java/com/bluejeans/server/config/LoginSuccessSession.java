package com.bluejeans.server.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class LoginSuccessSession implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 로그인이 성공하면 세션에 isLogin과 nickname을 추가
        request.getSession().setAttribute("isLogin", true);
        System.out.println(authentication);
        // authentication 객체에서 사용자 정보를 가져와서 세션에 추가
//        String nickname = authentication.getPrincipal()
//        request.getSession().setAttribute("nickname", nickname);

        // 이후 리다이렉트 등을 수행하거나 다른 작업을 수행할 수 있습니다.
        //response.sendRedirect("/home"); // 로그인 후 이동할 페이지
    }
}
