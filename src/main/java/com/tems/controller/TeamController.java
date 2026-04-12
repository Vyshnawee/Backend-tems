
package com.tems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tems.IService.ITeamService;
import com.tems.dto.TeamRequestDTO;
import com.tems.dto.TeamResponseDTO;
import com.tems.model.User;
import com.tems.service.UserService;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private ITeamService teamService;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<TeamResponseDTO> createTeam(@RequestBody TeamRequestDTO team) {

        TeamResponseDTO response = teamService.createTeam(team);

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamResponseDTO> getTeamById(@PathVariable Integer id) {

        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    @GetMapping
    public ResponseEntity<List<TeamResponseDTO>> getAllTeams() {

        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamResponseDTO> updateTeam(
            @PathVariable Integer id,
            @RequestBody TeamRequestDTO team) {

        return ResponseEntity.ok(teamService.updateTeam(id, team));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Integer id) {

        teamService.deleteTeamById(id);

        return ResponseEntity.noContent().build(); 
    }

    @GetMapping("/name/{teamName}")
    public ResponseEntity<TeamResponseDTO> getTeamByName(@PathVariable String teamName) {

        return ResponseEntity.ok(teamService.getTeamByName(teamName));
    }
    
    @PostMapping("/{teamId}/member/{userId}")
    public ResponseEntity<String> addUserToTeam(@PathVariable Integer teamId,
                               @PathVariable Integer userId) {

        teamService.addUserToTeam(teamId, userId);
        return ResponseEntity.ok("User added to team successfully");
    }
    
    @GetMapping("/{teamId}/users")
    public List<User> getUsersByTeam(@PathVariable Integer teamId) {
        return userService.getUsersByTeam(teamId);
    }
    
    @PutMapping("/{teamId}/users/{userId}/remove")
    public ResponseEntity<String> removeUserFromTeam(
            @PathVariable Integer teamId,
            @PathVariable Integer userId) {

        userService.removeUserFromTeam(teamId, userId);
        return ResponseEntity.ok("User removed from team");
    }
    
}
