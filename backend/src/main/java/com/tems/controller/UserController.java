package com.tems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tems.IService.IUserService;
import com.tems.dto.UserRegisterDTO;
import com.tems.dto.UserResponseDTO;
import com.tems.dto.UserUpdateDTO;
import com.tems.model.User;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRegisterDTO user) {

        UserResponseDTO response = userService.createUser(user);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Integer id) {

        UserResponseDTO response = userService.getUserById(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {

        List<UserResponseDTO> response = userService.getAllUsers();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Integer id,
            @RequestBody UserUpdateDTO user) {

        UserResponseDTO response = userService.updateUser(id, user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {

        userService.deleteUserById(id);

        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/name/{userName}")
    public ResponseEntity<UserResponseDTO> getUserByUserName(@PathVariable String userName) {

        UserResponseDTO response = userService.getUserByUserName(userName);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    
    @GetMapping("/available-employees")
    public List<UserResponseDTO> getAvailableEmployees() {
        return userService.getAvailableEmployees();
    }

    @PutMapping("/profile/{id}")
    public UserResponseDTO updateProfile(@PathVariable Integer id,
                              @RequestBody User user) {
        return userService.updateProfile(id, user);
    }
      
}