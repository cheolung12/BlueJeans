package com.bluejeans.server.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

        String errorMessage;

        if (exception instanceof UsernameNotFoundException) {
            errorMessage = "User not found."; //왜 안되지...
        }else if (exception instanceof BadCredentialsException) {
            errorMessage = "Invalid username or password."; //따로 설정불가...
        }else {
            errorMessage = "Authentication failed.";
        }

        // errorMessage를 활용하여 원하는 처리를 수행

        getRedirectStrategy().sendRedirect(request, response, "/login?error=" + errorMessage);
    }
}
