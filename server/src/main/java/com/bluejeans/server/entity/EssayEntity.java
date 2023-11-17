package com.bluejeans.server.entity;

import com.bluejeans.server.dto.EssayDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Getter
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

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    @ManyToOne
    @JoinColumn(name = "user_id") // 조인 컬럼 및 필수 설정
    private UserEntity user;



}
