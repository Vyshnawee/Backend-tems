package com.tems.Repository;

import com.tems.model.Approval;
import com.tems.model.Expense;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Integer> {
	void deleteByExpense(Expense expense);
	
	List<Approval> findByStatus(String status);
	
	boolean existsByExpense(Expense expense);
	
	Approval findByExpense(Expense expense);
	
	Optional<Approval> findByExpenseExpenseId(Integer expenseId);
}