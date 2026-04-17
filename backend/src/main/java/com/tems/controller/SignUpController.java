package com.tems.controller;

import com.tems.dto.SignupRequest;
import com.tems.model.User;
import com.tems.service.SignUpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @PostMapping
    public String register(@RequestBody SignupRequest request) {
        return signUpService.registerCompanyAdmin(request);
    }
    
    @PutMapping("/assign-admin")
    public User assignAdmin(@RequestParam Integer userId,
                            @RequestParam Integer companyId) {

        return signUpService.assignAdminToCompany(userId, companyId);
    }
    
    @PostMapping("/company")
    public String createCompany(@RequestParam String companyName) {

        signUpService.createCompany(companyName);
        return "Company created successfully";
    }
    
}