package com.bluejeans.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "essay_file")
public class EssayFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "essay_id", nullable = false)
    private EssayEntity essay;

    @Column(nullable = true)
    private String img_path;

//    public void updateImgPath(String imgPath) {
//        this.setImg_path(imgPath);
//    }
}
