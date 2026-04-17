package com.tems.service;

import com.tems.Repository.ExpenseRepository;
import com.tems.dto.*;
import com.tems.model.Expense;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ManagerDashboardService {

    private final ExpenseRepository repo;

    public ManagerDashboardService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public List<CategoryDTO> getCategory(Integer teamId) {
        return repo.getCategoryByTeam(teamId);
    }

    public List<MonthlyDTO> getMonthly(Integer teamId) {
        return repo.getMonthlyByTeam(teamId);
    }

    public Map<String, Double> getSummary(Integer teamId) {
        Map<String, Double> map = new HashMap<>();
        map.put("total", repo.getTotalByTeam(teamId));
        map.put("approved", repo.getApprovedByTeam(teamId));
        map.put("pending", repo.getPendingByTeam(teamId));
        map.put("rejected", repo.getRejectedByTeam(teamId));
        return map;
    }

    public List<Expense> getPending(Integer teamId) {
        return repo.findByStatusAndUser_Team_TeamId("PENDING", teamId);
    }

}