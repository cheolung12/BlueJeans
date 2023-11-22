package com.bluejeans.server.config;

import com.bluejeans.server.service.UserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    @Autowired
    AuthenticationFailureHandler customAuthenticationFailureHandler;

    private final UserDetailService userDetailService;

    @Bean
    public WebSecurityCustomizer configure(){
        return (web) -> web.ignoring().requestMatchers("/public/**");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
                .authorizeRequests()

                .requestMatchers("/login", "/signup","/user","/essays","essays/detail/{essay_id}", "/**", "/jobs/**","/api/jobs/**").permitAll() //허가없이 접근가능한 경로

                .anyRequest().authenticated()
                .and()
                .formLogin(customizer-> customizer.loginPage("/login")
                        .usernameParameter("userID").passwordParameter("password")
                        .failureHandler(customAuthenticationFailureHandler)
//                        .failureUrl("/login?error=true") //로그인 실패시 이동할 url. 에러정보 param으로 전달
                        .defaultSuccessUrl("/home"))
                .logout(customizer -> customizer.logoutUrl("/logout")
                        .logoutSuccessUrl("/login").invalidateHttpSession(true)) //세션을 무효화
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement( session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)// 세션이 필요할 때만 생성
                        .invalidSessionUrl("/login?timeout") // 세션이 유효하지 않을 때 리다이렉트할 URL
                        .maximumSessions(1) // 동시에 여러 세션 허용하지 않음
                        .maxSessionsPreventsLogin(true) // 동시에 여러 세션 허용하지 않음
                        .expiredUrl("/login?expired")) // 만료된 세션으로 간주되면 리다이렉트할 URL
                .build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() throws Exception{
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setUserDetailsService(userDetailService);
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());

        return daoAuthenticationProvider;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
