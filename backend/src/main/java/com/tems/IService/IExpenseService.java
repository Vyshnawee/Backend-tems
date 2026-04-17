package com.tems.IService;

import java.util.List;

import com.tems.dto.ExpenseRequestDTO;
import com.tems.dto.ExpenseResponseDTO;
import com.tems.model.Expense;


public interface IExpenseService {
	
	ExpenseResponseDTO createExpense(ExpenseRequestDTO  expense,Integer userId);

    ExpenseResponseDTO getExpenseById(Integer expenseId);

    List<ExpenseResponseDTO> getAllExpenses();

    ExpenseResponseDTO updateExpense(Integer expenseId, Expense expense);

    void deleteExpenseById(Integer expenseId);
    
    public List<ExpenseResponseDTO> getExpensesByUser(Integer userId);
    
    public List<Expense> getExpensesByTeam(Integer teamId);
    
    public void updateStatus(Integer id, String status);
    
    public List<ExpenseResponseDTO> getApprovedExpenses();
    
    public List<Expense> getApprovedUnpaidExpenses();
    
    public List<ExpenseResponseDTO> getPaidExpenses();

}
