package com.tems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tems.Repository.ApprovalRepository;
import com.tems.Repository.ExpenseRepository;
import com.tems.Repository.UserRepository;
import com.tems.model.Approval;
import com.tems.model.Expense;
import com.tems.model.User;

@Service
public class ApprovalService {

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private ExpenseRepository expenseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public void approveExpense(Integer expenseId, Integer userId) {

        Approval approval = approvalRepository
            .findByExpenseExpenseId(expenseId)
            .orElseThrow(() -> new RuntimeException("Approval not found for expenseId: " + expenseId));

        Expense expense = approval.getExpense();

        if (expense == null) {
            throw new RuntimeException("Expense is null");
        }

        // ✅ STOP if already approved
        if ("APPROVED".equals(expense.getStatus())) {
            return;
        }

        //  manager (approver)
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // update approval
        approval.setStatus("APPROVED");
        approval.setApprovedAt(java.time.LocalDateTime.now());
        approval.setApprover(user);
        approvalRepository.save(approval);

        // update expense
        expense.setStatus("APPROVED");
        expenseRepository.save(expense);

        try {
            User employee = expense.getUser();

            //  Employee notification
            notificationService.createNotification(
                "Your expense \"" + expense.getTitle() + "\" (₹" + expense.getAmount() + ") was approved",
                employee,
                "APPROVED"
            );

            //  ADD THIS PART (ADMIN NOTIFICATION)
            List<User> admins = userRepository.findByRole_RoleName("ADMIN");

            for (User admin : admins) {
                notificationService.createNotification(
                    "Expense \"" + expense.getTitle() + "\" approved by " + user.getUserName(),
                    admin,
                    "APPROVED"
                );
            }

        } catch (Exception e) {
            System.out.println("Notification failed: " + e.getMessage());
        }
    }

    
    public List<Approval> getAllApprovals() {
    	return approvalRepository.findByStatus("APPROVED"); 
    	}
    
    
    public void rejectExpense(Integer expenseId) {

        Approval approval = approvalRepository
            .findByExpenseExpenseId(expenseId)
            .orElseThrow(() -> new RuntimeException("Approval not found"));

        Expense expense = approval.getExpense();

        if (expense == null) {
            throw new RuntimeException("Expense is null");
        }

        //  Update approval
        approval.setStatus("REJECTED");
        approval.setApprovedAt(java.time.LocalDateTime.now());

        approvalRepository.save(approval);

        //  Update expense
        expense.setStatus("REJECTED");
        expenseRepository.save(expense);

        //  Notification
        try {
            notificationService.createNotification(
                "Your expense \"" + expense.getTitle() + "\" (₹" +
                expense.getAmount() + ") was rejected",
                expense.getUser(),
                "REJECTED"
            );
        } catch (Exception e) {
            System.out.println("Notification failed: " + e.getMessage());
        }
    }
    
}