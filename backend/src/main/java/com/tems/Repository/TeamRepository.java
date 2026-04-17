package com.tems.Repository;


import com.tems.model.Team;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
	Optional<Team> findByTeamName(String teamName);
}
