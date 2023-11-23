package com.bluejeans.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ebook_content")
public class EBookContentEntity {
    @Id
    private int book_id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToOne
    @MapsId
    @JoinColumn(name = "book_id")
    private EBookEntity eBookEntity;
}
