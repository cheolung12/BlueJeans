package com.bluejeans.server.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
public class RecruitDibsEntityKey implements Serializable {
    private int recruit;
    private int user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecruitDibsEntityKey that = (RecruitDibsEntityKey) o;
        return Objects.equals(recruit, that.recruit) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recruit, user);
    }
}
