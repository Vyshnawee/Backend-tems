package com.tems.IService;

import java.util.List;

import com.tems.dto.UserRegisterDTO;
import com.tems.dto.UserResponseDTO;
import com.tems.dto.UserUpdateDTO;
import com.tems.model.User;

public interface IUserService {
	
	UserResponseDTO createUser(UserRegisterDTO user);

    UserResponseDTO getUserById(Integer userId);
    
    List<UserResponseDTO> getAllUsers();

    UserResponseDTO updateUser(Integer userId, UserUpdateDTO user);

    void deleteUserById(Integer userId);

    UserResponseDTO getUserByUserName(String userName);
        
    List<User> getUsersByTeam(Integer teamId);
    
    List<UserResponseDTO> getAvailableEmployees();
        
    public UserResponseDTO updateProfile(Integer userId, User updatedUser);
}
