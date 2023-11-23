package com.bluejeans.server.entity;

import com.bluejeans.server.dto.EssayDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "essay")
public class EssayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 45)
    private String title;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(nullable = true)
    private String img_path;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    @ManyToOne
    @JoinColumn(name = "user_id") // 조인 컬럼 및 필수 설정
    private UserEntity user;

    public void updateFields(EssayDTO essayDTO, String fileURL) {
        this.setTitle(essayDTO.getTitle());
        this.setContent(essayDTO.getContent());
        this.setImg_path(fileURL);
        this.setUpdated_at(new Timestamp(System.currentTimeMillis()));
    }

}
