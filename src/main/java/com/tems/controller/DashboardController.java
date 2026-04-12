package com.tems.controller;

import com.tems.dto.DashboardStatsDTO;
import com.tems.dto.RecentExpenseDTO;
import com.tems.service.DashboardService;
import com.tems.service.ExpenseService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class DashboardController {

    private final DashboardService dashboardService;
    
    @Autowired
    private ExpenseService expenseService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public DashboardStatsDTO getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
    
    @GetMapping("/recent")
    public List<RecentExpenseDTO> getRecentExpenses() {
        return dashboardService.getRecentExpenses();
    }
}