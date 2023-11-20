package com.bluejeans.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "recruit_file")
public class RecruitFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "rc_id", nullable = false)
    private RecruitEntity recruitId;

    @Column(nullable = true)
    private String img_path;

    public void updateImgPath(String imgPath) {
        this.setImg_path(imgPath);
    }
}
