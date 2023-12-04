package com.bluejeans.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EditUserInfoDTO {
    private String nickname;
    private String address;
    private String password;
//    private String img_path;

}
