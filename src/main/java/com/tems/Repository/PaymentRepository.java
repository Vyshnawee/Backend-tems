package com.tems.Repository;

import com.tems.model.Expense;
import com.tems.model.Payment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	Optional<Payment> findByExpense(Expense expense);
	
	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p")
    double getTotalPaid();
}
