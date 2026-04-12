package com.tems.Repository;

import com.tems.dto.RecentExpenseDTO;
import com.tems.model.Expense;
import com.tems.model.User;

import org.springframework.data.domain.Pageable; 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
	List<Expense> findByUser(User user);
	
	List<Expense> findByUser_UserId(Integer userId);

//	@Query("SELECT e FROM Expense e WHERE e.user.team.teamId = :teamId")
//	List<Expense> findByTeamId(@Param("teamId") Integer teamId);
	
	List<Expense> findByUser_Team_TeamId(Integer teamId);
	
	List<Expense> findByStatus(String status);

    // 🔥 Better version (only unpaid approved)
    List<Expense> findByStatusAndPaidAtIsNull(String status);
    
    List<Expense> findByPaidAtIsNotNull();
    
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e")
    double getTotalExpenses();
    
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.status = 'APPROVED'")
    double getApprovedExpensesTotal();
    
    @Query("SELECT new com.tems.dto.RecentExpenseDTO(e.id, e.user.userName, e.title, e.amount, e.status) " +
            "FROM Expense e ORDER BY e.createdAt DESC")
     List<RecentExpenseDTO> findRecentExpenses(Pageable pageable);
}