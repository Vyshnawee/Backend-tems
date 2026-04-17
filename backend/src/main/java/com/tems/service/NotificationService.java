package com.tems.service;

import com.tems.model.Notification;
import com.tems.model.User;

import jakarta.transaction.Transactional;

import com.tems.Repository.NotificationRepository;
import com.tems.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
	
	@Autowired
	private UserRepository userRepository;

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    //  Create notification
    public void createNotification(String message, User user, String type) {
        Notification notification = new Notification(message, user, type);
        notificationRepository.save(notification);
    }

    //  Get notifications
    public List<Notification> getUserNotifications(Integer userId) {
        return notificationRepository.findByUserUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }

    //  Unread count
    public long getUnreadCount(Integer userId) {
        return notificationRepository.countByUserUserIdAndIsReadFalse(userId);
    }

    //  Mark all as read
    @Transactional
    public void markAllAsRead(Integer userId) {
        List<Notification> list = notificationRepository.findByUserUserIdOrderByCreatedAtDesc(userId);

        for (Notification n : list) {
            n.setIsRead(true);
        }

        notificationRepository.saveAll(list);
    }
    
    public void createNotification(String message, Integer userId, String type) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification n = new Notification(message, user, type);

        notificationRepository.save(n);
    }
}