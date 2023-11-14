package com.bluejeans.server.dto;


import com.bluejeans.server.entity.Usertype;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;

    private String userID;

    private String nickname;

    private String password;

    private String address;

    private Usertype usertype;
}
