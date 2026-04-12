package com.tems.Repository;

import com.tems.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUserName(String userName);
	
	@Query("SELECT u FROM User u JOIN FETCH u.team WHERE u.email = :email")
	Optional<User> findByEmail(@Param("email") String email);
	
	List<User> findByTeam_TeamId(Integer teamId);
	
	@Query("SELECT u FROM User u WHERE u.team IS NULL AND u.role.roleName = 'EMPLOYEE'")
    List<User> findAvailableEmployees();

	Optional<User> findByEmailIgnoreCase(String email);
}