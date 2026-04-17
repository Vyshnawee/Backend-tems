package com.tems.dto;

import com.tems.model.Expense;

public class ExpenseMapper {

    public static ExpenseResponseDTO toDTO(Expense expense) {

        ExpenseResponseDTO dto = new ExpenseResponseDTO();

        dto.setExpenseId(expense.getExpenseId());
        dto.setTitle(expense.getTitle());
        dto.setAmount(expense.getAmount());
        dto.setDescription(expense.getDescription());
        dto.setReceiptUrl(expense.getReceiptUrl());
        dto.setStatus(expense.getStatus());

        if (expense.getCategory() != null) {
        	
            dto.setCategoryName(expense.getCategory().getName());
        }

        if (expense.getUser() != null) {
            dto.setUserName(expense.getUser().getUserName());
        }

        return dto;
    }
}