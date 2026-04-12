
package com.tems.dto;

import com.tems.model.Role;
import com.tems.model.Team;
import com.tems.model.User;

public class UserMapper {

    // 🔹 Entity → DTO
    public static UserResponseDTO toDTO(User user) {

        UserResponseDTO dto = new UserResponseDTO();

        dto.setUserId(user.getUserId());
        dto.setUserName(user.getUserName());
        dto.setEmail(user.getEmail());

        if (user.getRole() != null) {
            dto.setRole(user.getRole().getRoleName());
        }

        if (user.getTeam() != null) {
            dto.setTeamName(user.getTeam().getTeamName());
            dto.setTeamId(user.getTeam().getTeamId()); // 🔥 ADD THIS
        }

        return dto;
    }

    // 🔹 DTO → Entity
    public static User toEntity(UserRegisterDTO dto, Role role, Team team) {

        User user = new User();

        user.setUserName(dto.getUserName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(role);
        user.setTeam(team);

        return user;
    }
}