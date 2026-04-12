package com.tems.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tems.IService.IExpenseService;
import com.tems.dto.ExpenseMapper;
import com.tems.dto.ExpenseRequestDTO;
import com.tems.dto.ExpenseResponseDTO;
import com.tems.exception.ResourceNotFoundException;
import com.tems.model.Expense;
import com.tems.model.User;


import com.tems.model.Category;
import com.tems.Repository.CategoryRepository;
import com.tems.Repository.ExpenseRepository;
import com.tems.Repository.UserRepository;

@Service
public class ExpenseService implements IExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;

    public ExpenseResponseDTO createExpense(
            ExpenseRequestDTO dto,
            Integer userId
    ) {

        Expense expense = new Expense();

        expense.setTitle(dto.getTitle());
        expense.setAmount(dto.getAmount());
        expense.setDescription(dto.getDescription());

        // ✅ Just set URL (already prepared in controller)
        expense.setReceiptUrl(dto.getReceiptUrl());

        // 🔹 Category
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        expense.setCategory(category);

        // 🔹 User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        expense.setUser(user);

        // 🔹 Status
        expense.setStatus("PENDING");

        Expense savedExpense = expenseRepository.save(expense);

        return ExpenseMapper.toDTO(savedExpense);
    }


     

    //  GET BY ID
    @Override
    public ExpenseResponseDTO getExpenseById(Integer expenseId) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        return ExpenseMapper.toDTO(expense);
    }

    @Override
    public List<ExpenseResponseDTO> getAllExpenses() {

        return expenseRepository.findAll()
                .stream()
                .map(ExpenseMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseResponseDTO updateExpense(Integer expenseId, Expense expense) {

        Expense existing = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        existing.setTitle(expense.getTitle());
        existing.setAmount(expense.getAmount());
        existing.setDescription(expense.getDescription());
        existing.setReceiptUrl(expense.getReceiptUrl());
        existing.setStatus(expense.getStatus());
        existing.setCategory(expense.getCategory());
        existing.setUser(expense.getUser());

        Expense updated = expenseRepository.save(existing);

        return ExpenseMapper.toDTO(updated);
    }

    @Override
    public void deleteExpenseById(Integer expenseId) {

        if (!expenseRepository.existsById(expenseId)) {
            throw new ResourceNotFoundException("Expense not found");
        }

        expenseRepository.deleteById(expenseId);
    }
    
    public List<ExpenseResponseDTO> getExpensesByUser(Integer userId) {

        List<Expense> expenses = expenseRepository.findByUser_UserId(userId);

        return expenses.stream()
                .map(ExpenseMapper::toDTO)
                .toList();
    }
    
    public List<Expense> getExpensesByTeam(Integer teamId) {
        return expenseRepository.findByUser_Team_TeamId(teamId);
    }
    
    public void updateStatus(Integer id, String status) {
        Expense exp = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        exp.setStatus(status); // APPROVED / REJECTED
        expenseRepository.save(exp);
    }
    
    public List<ExpenseResponseDTO> getApprovedExpenses() {

        List<Expense> expenses = expenseRepository.findByStatus("APPROVED");

        return expenses.stream().map(expense -> {

            ExpenseResponseDTO dto = new ExpenseResponseDTO();

            dto.setExpenseId(expense.getExpenseId());
            dto.setTitle(expense.getTitle());
            dto.setAmount(expense.getAmount());
            dto.setDescription(expense.getDescription());
            dto.setReceiptUrl(expense.getReceiptUrl());
            dto.setStatus(expense.getStatus());

            // ✅ Category
            if (expense.getCategory() != null) {
                dto.setCategoryName(expense.getCategory().getName());
            }

            // ✅ User (Employee Name)
            if (expense.getUser() != null) {
                dto.setUserName(expense.getUser().getUserName());

                // ✅ Team Name (IMPORTANT)
                if (expense.getUser().getTeam() != null) {
                    dto.setTeamName(expense.getUser().getTeam().getTeamName());
                }
            }

            return dto;

        }).toList();
    }

    
    public List<Expense> getApprovedUnpaidExpenses() {
        return expenseRepository.findByStatusAndPaidAtIsNull("APPROVED");
    }

    public List<ExpenseResponseDTO> getPaidExpenses() {

        List<Expense> expenses = expenseRepository.findByPaidAtIsNotNull();

        return expenses.stream().map(expense -> {
            ExpenseResponseDTO dto = new ExpenseResponseDTO();

            dto.setExpenseId(expense.getExpenseId());
            dto.setTitle(expense.getTitle());
            dto.setAmount(expense.getAmount());
            dto.setStatus(expense.getStatus());

            // ✅ Employee name
            if (expense.getUser() != null) {
                dto.setUserName(expense.getUser().getUserName());
            }

            // ✅ Team name
            if (expense.getUser() != null && expense.getUser().getTeam() != null) {
                dto.setTeamName(expense.getUser().getTeam().getTeamName());
            }

            // ✅ Paid date (IMPORTANT)
            dto.setPaidAt(expense.getPaidAt());

            return dto;

        }).toList();
    }
    
    
}