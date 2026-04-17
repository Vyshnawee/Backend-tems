package com.tems.controller;

import com.tems.dto.AuthRequest;
import com.tems.dto.AuthResponse;
import com.tems.model.User;
import com.tems.service.CustomUserDetailsService;
import com.tems.Repository.UserRepository;
import com.tems.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // 🔥 Fetch full user
            User user = userRepository.findByEmailIgnoreCase(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 🔥 Extract role
            String role = user.getRole().getRoleName();

            // 🔥 Extract IDs
            Integer userId = user.getUserId();
            Integer teamId = user.getTeam() != null ? user.getTeam().getTeamId() : null;

            // 🔥 Generate token
            String token = jwtUtil.generateToken(request.getEmail());

            return ResponseEntity.ok(
                    new AuthResponse(token, role, userId, teamId)
            );

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }   
}