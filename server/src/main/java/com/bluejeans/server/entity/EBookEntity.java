package com.bluejeans.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ebook")
public class EBookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column
    private String publisher;

    @Column(length=20)
    private String genre;

    @ColumnDefault("9791192300825")
    private String ISBN;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String thumbnail;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToOne(mappedBy = "eBookEntity", cascade = CascadeType.ALL)
    private EBookContentEntity eBookContentEntity;

    @OneToMany(mappedBy = "ebook", cascade = CascadeType.ALL)
    private List<EBookDibsEntity> ebookDibs;
}
