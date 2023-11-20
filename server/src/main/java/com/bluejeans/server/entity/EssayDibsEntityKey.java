package com.bluejeans.server.entity;

import java.io.Serializable;
import java.util.Objects;

public class EssayDibsEntityKey implements Serializable {
    private int essay;  // EssayEntity의 ID 타입과 일치해야 합니다.
    private int user;   // UserEntity의 ID 타입과 일치해야 합니다.

    // 기본 생성자
    public EssayDibsEntityKey() {}

    // equals, hashCode 메서드 오버라이드
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EssayDibsEntityKey that = (EssayDibsEntityKey) o;
        return Objects.equals(essay, that.essay) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(essay, user);
    }
}