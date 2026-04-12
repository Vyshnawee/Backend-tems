package com.tems.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tems.IService.IUserService;
import com.tems.dto.LoginRequestDTO;
import com.tems.dto.UserMapper;
import com.tems.dto.UserRegisterDTO;
import com.tems.dto.UserResponseDTO;
import com.tems.dto.UserUpdateDTO;
import com.tems.exception.ResourceNotFoundException;
import com.tems.model.Role;
import com.tems.model.Team;
import com.tems.model.User;
import com.tems.Repository.RoleRepository;
import com.tems.Repository.TeamRepository;
import com.tems.Repository.UserRepository;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private TeamRepository teamRepository;

    @Override
    public UserResponseDTO createUser(UserRegisterDTO request) {

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        User user = new User();
        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        user.setRole(role);   

        User saved = userRepository.save(user);

        return UserMapper.toDTO(saved);
    }
    @Override
    public UserResponseDTO getUserById(Integer userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return UserMapper.toDTO(user);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(Integer userId, UserUpdateDTO dto) {

        User existing = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (dto.getUserName() != null) {
            existing.setUserName(dto.getUserName());
        }

        if (dto.getEmail() != null) {
            existing.setEmail(dto.getEmail());
        }

        if (dto.getRoleId() != null) {
            Role role = roleRepository.findById(dto.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            existing.setRole(role);
        }
        
        if (dto.getTeamId() != null) {

            Team team = teamRepository.findById(dto.getTeamId())
                    .orElseThrow(() -> new RuntimeException("Team not found"));

            existing.setTeam(team);
        }

        userRepository.save(existing);

        return UserMapper.toDTO(existing);
    }

    @Override
    public void deleteUserById(Integer userId) {

        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }

        userRepository.deleteById(userId);
    }

    @Override
    public UserResponseDTO getUserByUserName(String userName) {

        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return UserMapper.toDTO(user);
    }
    
    @Override
    public UserResponseDTO login(LoginRequestDTO request) {

        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmailIgnoreCase(email).orElse(null);

        // ❌ Invalid login
        if (user == null || !user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        UserResponseDTO dto = new UserResponseDTO();

        dto.setUserId(user.getUserId());
        dto.setUserName(user.getUserName());
        dto.setEmail(user.getEmail());

        // ✅ ROLE FIX
        if (user.getRole() != null) {
            dto.setRole(user.getRole().getRoleName());  // ADMIN / MANAGER / EMPLOYEE
        }

        // ✅ TEAM
        if (user.getTeam() != null) {
            dto.setTeamId(user.getTeam().getTeamId());
            dto.setTeamName(user.getTeam().getTeamName());
        }

        return dto;
    }
    @Override
    public List<User> getUsersByTeam(Integer teamId) {
        return userRepository.findByTeam_TeamId(teamId);
    }
    
    public void removeUserFromTeam(Integer teamId, Integer userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getTeam() == null ||
            !user.getTeam().getTeamId().equals(teamId)) {
            throw new RuntimeException("User not in this team");
        }

        user.setTeam(null);
        userRepository.save(user);
    }
    
    @Override
    public List<UserResponseDTO> getAvailableEmployees() {

        List<User> users = userRepository.findAvailableEmployees();

        return users.stream()
                .map(UserMapper::toDTO)
                .toList();
    }
    
}