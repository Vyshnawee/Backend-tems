package com.tems.controller;

import com.tems.service.ApprovalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tems.model.Approval;

@RestController
@RequestMapping("/approvals")
@CrossOrigin
public class ApprovalController {

    @Autowired
    private ApprovalService approvalService;

    @PostMapping("/approve/{expenseId}")
    public ResponseEntity<String> approveExpense(
            @PathVariable Integer expenseId,
            @RequestParam Integer userId   
    ) {
        approvalService.approveExpense(expenseId, userId);
        return ResponseEntity.ok("Approved");
    }
    
    @GetMapping
    public ResponseEntity<List<Approval>> getAllApprovals() {
        return ResponseEntity.ok(approvalService.getAllApprovals());
    }
    
    @PostMapping("/reject/{expenseId}")
    public ResponseEntity<String> rejectExpense(@PathVariable Integer expenseId) {
        approvalService.rejectExpense(expenseId);
        return ResponseEntity.ok("Rejected");
    }
}