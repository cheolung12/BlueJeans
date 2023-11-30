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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = true)
    private String title;

    @Column(nullable = true, length = 1000)
    private String content;

    @Column(columnDefinition = "boolean default true")
    private boolean recruiting;

    @Column
    private String moneyStandard;

    @Column                                 
    private int money;

    @Column(length = 45)
    private String region;

    @Column(length = 45)
    private String contact;

    @Column
    private String img_path;

    @Column(length = 45)
    private String workDay;

    @Column(length = 45)
    private String workTime;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToMany(mappedBy = "recruit", cascade = CascadeType.REMOVE)
    private List<RecruitDibsEntity> recruitDibs;

    public void updateFields(RecruitDTO recruitDTO, String fileURL) {
        this.setTitle(recruitDTO.getTitle());
        this.setContent(recruitDTO.getContent());
        this.setMoneyStandard(recruitDTO.getMoneyStandard());
        this.setMoney(recruitDTO.getMoney());
        this.setRegion(recruitDTO.getRegion());
        this.setContact(recruitDTO.getContact());
        this.setWorkDay(recruitDTO.getWorkDay());
        this.setWorkTime(recruitDTO.getWorkTime());
        if(fileURL != null){
            this.setImg_path(fileURL);
        }
    }
}
