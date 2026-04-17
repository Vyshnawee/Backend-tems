package com.tems.controller;

import com.tems.dto.CategoryDTO;
import com.tems.dto.EmployeeDashboardDTO;
import com.tems.dto.MonthlyDTO;
import com.tems.dto.RecentExpenseDTO;
import com.tems.service.EmployeeDashboardService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee/dashboard")
@CrossOrigin
public class EmployeeDashboardController {

    private final EmployeeDashboardService dashboardService;

    public EmployeeDashboardController(EmployeeDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{userId}")
    public EmployeeDashboardDTO getDashboard(@PathVariable Integer userId) {
        return dashboardService.getDashboard(userId);
    }
    
    @GetMapping("/{userId}/recent")
    public List<RecentExpenseDTO> getRecentExpenses(@PathVariable Integer userId) {
        return dashboardService.getRecentExpenses(userId);
    }
    
    @GetMapping("/{userId}/monthly")
    public List<MonthlyDTO> getMonthlyData(@PathVariable Integer userId) {
        return dashboardService.getMonthlyData(userId);
    }
    
    @GetMapping("/{userId}/category")
    public List<CategoryDTO> getCategoryData(@PathVariable Integer userId) {
        return dashboardService.getCategoryData(userId);
    }
}