package com.tems.IService;

import java.util.List;

import com.tems.dto.TeamRequestDTO;
import com.tems.dto.TeamResponseDTO;

public interface ITeamService {
	
	TeamResponseDTO createTeam(TeamRequestDTO team);

    TeamResponseDTO getTeamById(Integer teamId);
   
    List<TeamResponseDTO> getAllTeams();

    TeamResponseDTO updateTeam(Integer teamId, TeamRequestDTO dto);

    void deleteTeamById(Integer teamId);

    TeamResponseDTO getTeamByName(String teamName);
    
    void addUserToTeam(Integer teamId, Integer userId);

}
