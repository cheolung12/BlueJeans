package com.bluejeans.server.entity;


import com.bluejeans.server.dto.EditUserInfoDTO;
import com.bluejeans.server.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import static com.bluejeans.server.entity.Usertype.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class UserEntity implements UserDetails {
//    @Id
//    @GeneratedValue(generator = "uuid-hibernate-generator")
//    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
//    private UUID id;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private String userID;

    @Column (nullable = false, length = 20)
    private String nickname;

    @Column(nullable = false, length = 255)
    private String password;

    @Column( length = 255)
    private String address;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Usertype userType ;


    @Override //권한 반환
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(USER.getRole()));
    }

    @Override //사용자 id 반환(고유한 값)
    public String getUsername() {
        return userID ;
    }

    @Override //사용자 패스워드 반환
    public String getPassword(){
        return password;
    }

    @Override //계정 만료 여부
    public boolean isAccountNonExpired() {
        return true; //true: 만료x
    }

    @Override //계정 잠금 여부
    public boolean isAccountNonLocked() {
        return true; //true: 잠금 x
    }

    @Override //패스워드 만료 여부 반환
    public boolean isCredentialsNonExpired() {
        return true; //true: 만료 x
    }

    @Override // 계정 사용 가능 여부
    public boolean isEnabled() {
        return true; // true: 사용가
    }


    public void updateFields(EditUserInfoDTO userDTO){
        this.setNickname(userDTO.getNickname());
        this.setAddress(userDTO.getAddress());
    }


}
