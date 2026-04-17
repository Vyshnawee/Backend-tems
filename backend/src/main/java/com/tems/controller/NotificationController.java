package com.tems.controller;

import com.tems.model.Notification;
import com.tems.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    //  Get all notifications
    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Integer userId) {
        return notificationService.getUserNotifications(userId);
    }

    //  Get unread count
    @GetMapping("/unread/{userId}")
    public Map<String, Long> getUnread(@PathVariable Integer userId) {
        return Map.of("count", notificationService.getUnreadCount(userId));
    }

    //  Mark all as read
    @PutMapping("/read/{userId}")
    public String markRead(@PathVariable Integer userId) {
        notificationService.markAllAsRead(userId);
        return "All notifications marked as read";
    }
    
    @PostMapping("/create")
    public String createNotification(@RequestBody Map<String, Object> body) {

        String message = (String) body.get("message");
        String type = (String) body.get("type");
        Integer userId = (Integer) body.get("userId");

        notificationService.createNotification(message, userId, type);

        return "Notification created successfully";
    }
}