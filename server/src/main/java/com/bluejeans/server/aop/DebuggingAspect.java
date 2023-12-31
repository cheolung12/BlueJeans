package com.bluejeans.server.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class DebuggingAspect {
    @Pointcut("execution(* com.bluejeans.server.service..*.*(..))")  //경로설정 (service의 폴더 모두 적용)
    private void cut() {}

    @Before("cut()")
    public void loggingArgs(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();

        String className = joinPoint.getTarget()
                .getClass()
                .getSimpleName();

        String methodName = joinPoint.getSignature()
                .getName();

        for(Object obj: args){
            log.info("{}#{}의 입력값 => {}", className, methodName, obj);
        }
    }

    @AfterReturning(value = "cut()", returning = "returnObj")
    public void loggingReturnValue(@NotNull JoinPoint joinPoint, Object returnObj){
        String className = joinPoint.getTarget()
                .getClass()
                .getSimpleName();

        String methodName = joinPoint.getSignature()
                .getName();

        log.info("{}#{}의 반환값 => {}", className, methodName, returnObj);
    }

}
