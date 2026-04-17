package com.tems.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private boolean isRead = false;

    private LocalDateTime createdAt;

    // Link to user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // optional (useful for filtering)
    private String type; // APPROVED / REJECTED / PAYMENT / SUBMITTED

    // Constructors
    public Notification() {}

    public Notification(String message, User user, String type) {
        this.message = message;
        this.user = user;
        this.type = type;
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public String getMessage() { return message; }

    public boolean isRead() { return isRead; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public User getUser() { return user; }

    public String getType() { return type; }

    public void setIsRead(boolean isRead) {
        this.isRead = isRead;
    }
}