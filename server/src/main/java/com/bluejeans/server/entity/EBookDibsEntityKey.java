package com.bluejeans.server.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
public class EBookDibsEntityKey implements Serializable {
    private int ebook;
    private int user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EBookDibsEntityKey that = (EBookDibsEntityKey) o;
        return Objects.equals(ebook, that.ebook) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ebook, user);
    }
}
