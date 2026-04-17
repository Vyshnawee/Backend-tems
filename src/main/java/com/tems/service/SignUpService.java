package com.tems.service;

import com.tems.dto.SignupRequest;
import com.tems.model.Company;
import com.tems.model.Role;
import com.tems.model.User;
import com.tems.Repository.CompanyRepository;
import com.tems.Repository.RoleRepository;
import com.tems.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public String registerCompanyAdmin(SignupRequest request) {

        // 🔴 1. Check if email already exists
        if (userRepository.findByEmailIgnoreCase(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 🏢 2. Create Company
        Company company = new Company();
        company.setCompanyName(request.getCompanyName());
        company = companyRepository.save(company);

        // 👑 3. Fetch ADMIN role
        Role adminRole = roleRepository.findByRoleName("ADMIN")
                .orElseThrow(() -> new RuntimeException("ADMIN role not found"));

        //  4. Create Admin User
        User user = new User();
        user.setUserName(request.getAdminName());
        user.setEmail(request.getEmail());

        //  Plain text password (ONLY for now — change later)
        user.setPassword(request.getPassword());

        //  Recommended later:
        // user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(adminRole);
        user.setCompany(company);

        user.setProfileImage(null);

        userRepository.save(user);

        return "Company and Admin registered successfully";
    }
    
    public User assignAdminToCompany(Integer userId, Integer companyId) {

        // Get user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get company
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        //Optional: ensure user is ADMIN
        if (!user.getRole().getRoleName().equals("ADMIN")) {
            throw new RuntimeException("User is not an ADMIN");
        }

        // Assign company
        user.setCompany(company);

        return userRepository.save(user);
    }
    
    public void createCompany(String companyName) {

        Company company = new Company();
        company.setCompanyName(companyName);

        companyRepository.save(company);
    }
}