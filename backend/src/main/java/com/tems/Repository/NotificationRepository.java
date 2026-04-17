package com.tems.Repository;

import com.tems.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserUserIdOrderByCreatedAtDesc(Integer userId);

    long countByUserUserIdAndIsReadFalse(Integer userId);
    
    List<Notification> findByUserUserIdAndIsReadFalseOrderByCreatedAtDesc(Integer userId);
}