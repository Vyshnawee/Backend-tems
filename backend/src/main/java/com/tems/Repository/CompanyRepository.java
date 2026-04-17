package com.tems.Repository;

import com.tems.model.Company;
import com.tems.model.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
}