package com.bluejeans.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

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

    @Column(length=20)
    private String ISBN = "9791192300825";

    @Column
    private String description;

    @Column
    private String thumbnail;

    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToOne(mappedBy = "eBookEntity", cascade = CascadeType.ALL)
    private EBookContentEntity eBookContentEntity;
}
