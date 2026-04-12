package com.tems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tems.Repository.ApprovalRepository;
import com.tems.Repository.ExpenseRepository;
import com.tems.model.Approval;
import com.tems.model.Expense;

@Service
public class ApprovalService {

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private ExpenseRepository expenseRepository;
    

    public void approveExpense(Integer expenseId, Integer userId) {
        Expense expense = expenseRepository.findById(expenseId)
            .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setStatus("APPROVED");
        expenseRepository.save(expense);
    }
    
    public List<Approval> getAllApprovals() {
    	return approvalRepository.findByStatus("APPROVED"); 
    	}
    
    
    public void rejectExpense(Integer expenseId) {
        Approval approval = approvalRepository.findByExpenseExpenseId(expenseId)
            .orElseThrow(() -> new RuntimeException("Approval not found"));

        // ❌ DELETE from approval table
        approvalRepository.delete(approval);

        // ✅ OPTIONAL: update expense status also
        Expense expense = approval.getExpense();
        expense.setStatus("REJECTED");
        expenseRepository.save(expense);
    }

}