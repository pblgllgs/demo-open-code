package com.pblgllgs.demoopencode.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "works")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String tags;

    private String codeLink;

    private String projectLink;

    private String imgUrl;
}
