package com.tems.Repository;

import com.tems.dto.CategoryDTO;
import com.tems.dto.MonthlyDTO;
import com.tems.dto.RecentExpenseDTO;
import com.tems.dto.TeamExpenseDTO;
import com.tems.model.Expense;
import com.tems.model.User;

import org.springframework.data.domain.Pageable; 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
	List<Expense> findByUser(User user);
	
	List<Expense> findByUser_UserId(Integer userId);
	
	List<Expense> findByUser_Team_TeamId(Integer teamId);
	
	List<Expense> findByStatus(String status);
	
	List<Expense> findByStatusAndUser_Team_TeamId(String status, Integer teamId);

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
    
    long countByUserUserId(Integer userId);

    long countByUserUserIdAndStatus(Integer userId, String status);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.userId = :userId")
    double getTotalAmountByUser(Integer userId);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.userId = :userId AND e.status = 'PAID'")
    double getPaidAmountByUser(Integer userId);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.userId = :userId AND e.status = 'PENDING'")
    double getPendingAmountByUser(Integer userId);
  
    @Query("""
    	    SELECT new com.tems.dto.RecentExpenseDTO(
    	        e.id,
    	        e.user.userName,   
    	        e.title,
    	        e.amount,
    	        e.status
    	    )
    	    FROM Expense e
    	    WHERE e.user.userId = :userId
    	    ORDER BY e.createdAt DESC
    	""")
    	List<RecentExpenseDTO> getRecentExpenses(@Param("userId") Integer userId, Pageable pageable);

    @Query("""
    	    SELECT new com.tems.dto.MonthlyDTO(
    	        MONTH(e.createdAt),
    	        COALESCE(SUM(e.amount), 0)
    	    )
    	    FROM Expense e
    	    WHERE e.user.userId = :userId
    	    GROUP BY MONTH(e.createdAt)
    	    ORDER BY MONTH(e.createdAt)
    	""")
    	List<MonthlyDTO> getMonthlyExpenses(@Param("userId") Integer userId);
    
    @Query("""
    	    SELECT new com.tems.dto.CategoryDTO(
    	        e.category.name,
    	        COALESCE(SUM(e.amount), 0)
    	    )
    	    FROM Expense e
    	    WHERE e.user.userId = :userId
    	    GROUP BY e.category
    	""")
    	List<CategoryDTO> getCategoryData(@Param("userId") Integer userId);
    
    @Query("SELECT COALESCE(SUM(e.amount),0) FROM Expense e WHERE e.user.team.teamId = :teamId")
    double getTotalByTeam(@Param("teamId") Integer teamId);

    @Query("SELECT COALESCE(SUM(e.amount),0) FROM Expense e WHERE e.status='APPROVED' AND e.user.team.teamId = :teamId")
    double getApprovedByTeam(@Param("teamId") Integer teamId);

    @Query("SELECT COALESCE(SUM(e.amount),0) FROM Expense e WHERE e.status='PENDING' AND e.user.team.teamId = :teamId")
    double getPendingByTeam(@Param("teamId") Integer teamId);

    @Query("SELECT COALESCE(SUM(e.amount),0) FROM Expense e WHERE e.status='REJECTED' AND e.user.team.teamId = :teamId")
    double getRejectedByTeam(@Param("teamId") Integer teamId);

    // 🔹 Monthly (Manager - ALL users)
    @Query("""
    	    SELECT new com.tems.dto.MonthlyDTO(
    	        MONTH(e.createdAt),
    	        SUM(e.amount)
    	    )
    	    FROM Expense e
    	    WHERE e.user.team.teamId = :teamId
    	    GROUP BY MONTH(e.createdAt)
    	    ORDER BY MONTH(e.createdAt)
    	""")
    	List<MonthlyDTO> getMonthlyByTeam(@Param("teamId") Integer teamId);

    // 🔹 Category (Manager - ALL users)
    @Query("""
    	    SELECT new com.tems.dto.CategoryDTO(
    	        e.category.name,
    	        SUM(e.amount)
    	    )
    	    FROM Expense e
    	    WHERE e.user.team.teamId = :teamId
    	    GROUP BY e.category.name
    	""")
    	List<CategoryDTO> getCategoryByTeam(@Param("teamId") Integer teamId);
    
    @Query("SELECT COUNT(e) FROM Expense e")
    Long countAllExpenses();

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.status = 'PAID'")
    Double getPaidAmount();

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.status = 'PENDING'")
    Double getPendingAmount();
    
    @Query("SELECT new com.tems.dto.MonthlyDTO(MONTH(e.createdAt), SUM(e.amount)) " +
    	       "FROM Expense e GROUP BY MONTH(e.createdAt)")
    	List<MonthlyDTO> getMonthlyExpenses();
    
    @Query("SELECT new com.tems.dto.TeamExpenseDTO(e.user.team.teamName, SUM(e.amount)) " +
    	       "FROM Expense e GROUP BY e.user.team.teamName")
    	List<TeamExpenseDTO> getTeamExpenses();
    
    @Query("SELECT new com.tems.dto.RecentExpenseDTO(e.expenseId, e.user.userName, e.title, e.amount, e.status) " +
    	       "FROM Expense e ORDER BY e.createdAt DESC")
    	List<RecentExpenseDTO> getRecentExpenses(Pageable pageable);
}