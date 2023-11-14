package com.bluejeans.server.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
// 로그인 오류 처리 핸들러
public class AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {

        // 여기에서 실패 원인을 확인하고 적절한 동작을 수행
        if (exception.getMessage().equals("Bad credentials")) {
            // 비밀번호가 틀렸을 때의 처리
            // 로그인 페이지로 리다이렉트하면서 실패 원인을 전달할 수 있습니다.
            getRedirectStrategy().sendRedirect(request, response, "/login?error=password");
        } else if (exception.getMessage().equals("User not found with username: ...")) {
            // 해당 사용자가 없을 때의 처리
            getRedirectStrategy().sendRedirect(request, response, "/login?error=userNotFound");
        } else {
            // 그 외의 실패 원인에 대한 처리
            getRedirectStrategy().sendRedirect(request, response, "/login?error=other");
        }
    }
}
