package com.bluejeans.server.entity;

import lombok.Getter;

@Getter
public enum Usertype {
    USER("ROLE_USER"), ADMIN("ROLE_ADMIN");


    private final String role;

    Usertype(String role) {
        this.role = role;
    }


}