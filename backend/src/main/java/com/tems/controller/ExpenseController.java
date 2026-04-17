package com.tems.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tems.IService.IExpenseService;
import com.tems.dto.ExpenseRequestDTO;
import com.tems.dto.ExpenseResponseDTO;
import com.tems.model.Expense;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private IExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseResponseDTO> createExpense(
            @RequestHeader("userId") Integer userId,
            @RequestParam String title,
            @RequestParam Double amount,
            @RequestParam Integer categoryId,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile file
    ) {

        ExpenseRequestDTO dto = new ExpenseRequestDTO();
        dto.setTitle(title);
        dto.setAmount(amount);
        dto.setCategoryId(categoryId);
        dto.setDescription(description);

        if (file != null && !file.isEmpty()) {
            try {
                String uploadDir = System.getProperty("user.dir") + "/uploads/";
                File dir = new File(uploadDir);

                if (!dir.exists()) {
                    dir.mkdirs();
                }

                String fileName = System.currentTimeMillis() + "_" +
                        file.getOriginalFilename().replaceAll(" ", "_");

                file.transferTo(new File(uploadDir + fileName));

                // ✅ save only relative path
                dto.setReceiptUrl("/uploads/" + fileName);

            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("File upload failed");
            }
        }

        ExpenseResponseDTO response = expenseService.createExpense(dto, userId);

        return ResponseEntity.status(201).body(response);
    }

  
    
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> getExpenseById(@PathVariable Integer id) {

        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponseDTO>> getAllExpenses() {

        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> updateExpense(
            @PathVariable Integer id,
            @RequestBody Expense expense) {

        return ResponseEntity.ok(expenseService.updateExpense(id, expense));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Integer id) {

        expenseService.deleteExpenseById(id);

        return ResponseEntity.noContent().build(); 
    }
    
    @GetMapping("/user/{userId}")
    public List<ExpenseResponseDTO> getExpensesByUser(
            @PathVariable Integer userId) {

        return expenseService.getExpensesByUser(userId);
    }
    
    @GetMapping("/team/{teamId}")
    public List<Expense> getExpensesByTeam(@PathVariable Integer teamId) {
    	
        return expenseService.getExpensesByTeam(teamId);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Integer id,
            @RequestParam String status
    ) {
        expenseService.updateStatus(id, status);
        return ResponseEntity.ok("Status updated");
    }
    
    @GetMapping("/approved")
    public List<ExpenseResponseDTO> getApprovedExpenses() {
        return expenseService.getApprovedExpenses();
    }

    // 🔥 Best version (use this in frontend)
    @GetMapping("/approved-unpaid")
    public List<Expense> getApprovedUnpaidExpenses() {
        return expenseService.getApprovedUnpaidExpenses();
    }
    
    @GetMapping("/paid")
    public List<ExpenseResponseDTO> getPaidExpenses() {
        return expenseService.getPaidExpenses();
    }
    
    
    
}