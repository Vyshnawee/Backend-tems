package com.tems.service;

import com.tems.Repository.ExpenseRepository;
import com.tems.dto.CategoryDTO;
import com.tems.dto.EmployeeDashboardDTO;
import com.tems.dto.MonthlyDTO;
import com.tems.dto.RecentExpenseDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EmployeeDashboardService {

    private final ExpenseRepository expenseRepository;

    public EmployeeDashboardService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public EmployeeDashboardDTO getDashboard(Integer userId) {

    	long totalExpenses = expenseRepository.countByUserUserId(userId);

    	long paidExpenses = expenseRepository
    	        .countByUserUserIdAndStatus(userId, "PAID");

    	long pendingExpenses = expenseRepository
    	        .countByUserUserIdAndStatus(userId, "PENDING");

        double totalAmount = expenseRepository.getTotalAmountByUser(userId);
        double paidAmount = expenseRepository.getPaidAmountByUser(userId);
        double pendingAmount = expenseRepository.getPendingAmountByUser(userId);

        return new EmployeeDashboardDTO(
                totalExpenses,
                paidExpenses,
                pendingExpenses,
                totalAmount,
                paidAmount,
                pendingAmount
        );
    }
    
    public List<RecentExpenseDTO> getRecentExpenses(Integer userId) {
        Pageable pageable = PageRequest.of(0, 5);
        return expenseRepository.getRecentExpenses(userId, pageable);
    }
    
    public List<MonthlyDTO> getMonthlyData(Integer userId) {
        return expenseRepository.getMonthlyExpenses(userId);
    }
    
    public List<CategoryDTO> getCategoryData(Integer userId) {
        return expenseRepository.getCategoryData(userId);
    }
}