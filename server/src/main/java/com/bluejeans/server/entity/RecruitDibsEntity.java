package com.bluejeans.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="recruit_dibs")
@IdClass(RecruitDibsEntityKey.class)
public class RecruitDibsEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "rc_id")
    private RecruitEntity recruit;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
