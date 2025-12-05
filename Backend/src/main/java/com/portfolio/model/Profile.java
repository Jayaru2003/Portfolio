package com.portfolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String title;
    private String bio;

    @Column(length = 1000)
    private String aboutDescription;

    private String profileImageUrl;
    private String cvUrl;

    // Social Links
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String emailAddress;
    private String phoneNumber;

    // Stats
    private Integer yearsExperience;
    private Integer projectsCompleted;
    private Integer happyClients;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
