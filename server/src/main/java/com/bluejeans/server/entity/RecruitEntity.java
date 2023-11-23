package com.bluejeans.server.entity;

import com.bluejeans.server.dto.RecruitDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "recruit")
public class RecruitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "recruit", cascade = CascadeType.REMOVE)
    private List<RecruitDibsEntity> recruitDibs;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userId;

    @Column(nullable = true)
    private String title;

    @Column(nullable = true, length = 1000)
    private String content;

    @Column(nullable = true)
    private int money;

    @Column(nullable = true, length = 45)
    private String region;

    @Column(nullable = true, length = 45)
    private String contact;

    @Column(nullable = true)
    private String img_path;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    public void updateFields(RecruitDTO recruitDTO, String fileURL) {
        this.setTitle(recruitDTO.getTitle());
        this.setContent(recruitDTO.getContent());
        this.setMoney(recruitDTO.getMoney());
        this.setRegion(recruitDTO.getRegion());
        this.setContact(recruitDTO.getContact());
        this.setImg_path(fileURL);
    }
}
