package com.tems.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tems.IService.ITeamService;
import com.tems.dto.TeamRequestDTO;
import com.tems.dto.TeamResponseDTO;
import com.tems.exception.ResourceNotFoundException;
import com.tems.model.Team;
import com.tems.model.User;
import com.tems.Repository.TeamRepository;
import com.tems.Repository.UserRepository;

@Service
public class TeamService implements ITeamService {

    @Autowired
    private TeamRepository teamRepository;
    
    @Autowired
    private UserRepository userRepository;


    private TeamResponseDTO mapToDTO(Team team) {
        TeamResponseDTO dto = new TeamResponseDTO();
        dto.setTeamId(team.getTeamId());
        dto.setTeamName(team.getTeamName());
        
        if (team.getManager() != null) {
            dto.setManagerName(team.getManager().getUserName());
        }
        return dto;
    }

    @Override
    public TeamResponseDTO createTeam(TeamRequestDTO dto) {

        Team team = new Team();
        team.setTeamName(dto.getTeamName());

        User createdBy = userRepository.findById(dto.getCreatedById())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        User manager = userRepository.findById(dto.getManagerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        team.setCreatedBy(createdBy);
        team.setManager(manager);

        Team saved = teamRepository.save(team);
        
        manager.setTeam(saved);
        userRepository.save(manager);

        return mapToDTO(saved);
    }

    @Override
    public TeamResponseDTO getTeamById(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        return mapToDTO(team);
    }

    @Override
    public List<TeamResponseDTO> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TeamResponseDTO updateTeam(Integer teamId, TeamRequestDTO dto) {

    	Team existing = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        if (dto.getTeamName() != null) {
            existing.setTeamName(dto.getTeamName());
        }

        if (dto.getManagerId() != null) {

            User manager = userRepository.findById(dto.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            existing.setManager(manager);

            manager.setTeam(existing);
            userRepository.save(manager);
        }

        if (dto.getCreatedById() != null) {

            User createdBy = userRepository.findById(dto.getCreatedById())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            existing.setCreatedBy(createdBy);

            createdBy.setTeam(existing);
            userRepository.save(createdBy);
        }

        Team updated = teamRepository.save(existing);

        return mapToDTO(updated);
    }

    @Override
    public void deleteTeamById(Integer teamId) {

        if (!teamRepository.existsById(teamId)) {
            throw new ResourceNotFoundException("Team not found");
        }

        teamRepository.deleteById(teamId);
    }

    @Override
    public TeamResponseDTO getTeamByName(String teamName) {

        Team team = teamRepository.findByTeamName(teamName)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        return mapToDTO(team);
    }
    
    public void addUserToTeam(Integer teamId, Integer userId) {

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setTeam(team);

        userRepository.save(user);
    }
}