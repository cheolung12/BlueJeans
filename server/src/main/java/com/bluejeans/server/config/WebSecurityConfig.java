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
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    @Autowired
    AuthenticationFailureHandler customAuthenticationFailureHandler;
    @Autowired
    LoginSuccessSession loginSuccessSession;

    private final UserDetailService userDetailService;

    @Bean
    public WebSecurityCustomizer configure(){
        return (web) -> web.ignoring().requestMatchers("/public/**");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http

                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(customizer-> customizer.loginPage("/login")
                        .usernameParameter("userID").passwordParameter("password")
                        .failureHandler(customAuthenticationFailureHandler)
//                        .successHandler(loginSuccessSession)
//                        .failureUrl("/login?error=true") //로그인 실패시 이동할 url. 에러정보 param으로 전달
                        .defaultSuccessUrl("/api/home"))
                .logout(customizer -> customizer.logoutUrl("/logout")
                        .logoutSuccessUrl("/api/login").invalidateHttpSession(true)) //세션을 무효화

                .sessionManagement( session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)// 세션이 필요할 때만 생성
                        .invalidSessionUrl("/api/login?timeout") // 세션이 유효하지 않을 때 리다이렉트할 URL
                        .maximumSessions(1) // 동시에 여러 세션 허용하지 않음
                        .maxSessionsPreventsLogin(true) // 동시에 여러 세션 허용하지 않음
                        .expiredUrl("/api/login?expired")) // 만료된 세션으로 간주되면 리다이렉트할 URL
                .addFilterBefore(new SessionFilter(), ConcurrentSessionFilter.class)
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


    //CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://www.bluejeansu.site"));
        config.setAllowedMethods(Arrays.asList("HEAD", "POST", "GET", "DELETE", "PUT", "PATCH"));
        config.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}

