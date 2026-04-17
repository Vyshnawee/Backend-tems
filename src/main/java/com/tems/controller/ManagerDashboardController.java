package com.tems.controller;

import com.tems.dto.*;
import com.tems.model.Expense;
import com.tems.service.ManagerDashboardService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manager")
@CrossOrigin
public class ManagerDashboardController {

    private final ManagerDashboardService service;

    public ManagerDashboardController(ManagerDashboardService service) {
        this.service = service;
    }

    @GetMapping("/dashboard/category")
    public List<CategoryDTO> category(@RequestParam Integer teamId) {
        return service.getCategory(teamId);
    }

    @GetMapping("/dashboard/monthly")
    public List<MonthlyDTO> monthly(@RequestParam Integer teamId) {
        return service.getMonthly(teamId);
    }

    @GetMapping("/dashboard/summary")
    public Map<String, Double> summary(@RequestParam Integer teamId) {
        return service.getSummary(teamId);
    }

    @GetMapping("/dashboard/pending")
    public List<Expense> pending(@RequestParam Integer teamId) {
        return service.getPending(teamId);
    }
}