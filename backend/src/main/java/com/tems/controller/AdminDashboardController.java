package com.tems.controller;

import com.tems.dto.*;
import com.tems.service.AdminDashboardService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/dashboard")
@CrossOrigin
public class AdminDashboardController {

    private final AdminDashboardService service;

    public AdminDashboardController(AdminDashboardService service) {
        this.service = service;
    }

    // ✅ Stats
    @GetMapping
    public AdminDashboardDTO getStats() {
        return service.getDashboardStats();
    }

    // ✅ Monthly
    @GetMapping("/monthly")
    public List<MonthlyDTO> getMonthly() {
        return service.getMonthlyData();
    }

    // ✅ Team Expenses
    @GetMapping("/team-expenses")
    public List<TeamExpenseDTO> getTeamExpenses() {
        return service.getTeamExpenses();
    }

    // ✅ Recent
    @GetMapping("/recent")
    public List<RecentExpenseDTO> getRecent() {
        return service.getRecentExpenses();
    }
}