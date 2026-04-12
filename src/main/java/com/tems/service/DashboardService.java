package com.tems.service;

import com.tems.Repository.*;
import com.tems.dto.DashboardStatsDTO;
import com.tems.dto.RecentExpenseDTO;

import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final ExpenseRepository expenseRepository;
    private final PaymentRepository paymentRepository;

    public DashboardService(UserRepository userRepository,
                            TeamRepository teamRepository,
                            ExpenseRepository expenseRepository,
                            PaymentRepository paymentRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.expenseRepository = expenseRepository;
        this.paymentRepository = paymentRepository;
    }

    public DashboardStatsDTO getDashboardStats() {

        long users = userRepository.count();
        long teams = teamRepository.count();
        double expenses = expenseRepository.getApprovedExpensesTotal(); 
        double paid = paymentRepository.getTotalPaid();

        return new DashboardStatsDTO(users, teams, expenses, paid);
    }
    
    public List<RecentExpenseDTO> getRecentExpenses() {
        return expenseRepository.findRecentExpenses(PageRequest.of(0, 5));
    }
}