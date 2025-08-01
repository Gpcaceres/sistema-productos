package com.categorias.categorias.models.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime; // Import LocalDateTime
import org.hibernate.annotations.CreationTimestamp; // Import CreationTimestamp

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    @CreationTimestamp // Automatically sets the creation timestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // New field for creation date

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter for createdAt
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

   
}