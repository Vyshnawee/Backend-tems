package com.tems.service;

import com.tems.dto.*;
import com.tems.Repository.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDashboardService {

    private final ExpenseRepository expenseRepo;
    private final UserRepository userRepo;

    public AdminDashboardService(ExpenseRepository expenseRepo, UserRepository userRepo) {
        this.expenseRepo = expenseRepo;
        this.userRepo = userRepo;
    }

    public AdminDashboardDTO getDashboardStats() {
        Long users = userRepo.countUsers();
        Long expenses = expenseRepo.countAllExpenses();
        Double paid = expenseRepo.getPaidAmount();
        Double pending = expenseRepo.getPendingAmount();

        return new AdminDashboardDTO(
                users,
                expenses,
                paid != null ? paid : 0,
                pending != null ? pending : 0
        );
    }

    public List<MonthlyDTO> getMonthlyData() {
        return expenseRepo.getMonthlyExpenses();
    }

    public List<TeamExpenseDTO> getTeamExpenses() {
        return expenseRepo.getTeamExpenses();
    }

    public List<RecentExpenseDTO> getRecentExpenses() {
        return expenseRepo.getRecentExpenses(PageRequest.of(0, 5));
    }
}