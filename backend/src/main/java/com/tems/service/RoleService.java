package com.tems.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tems.IService.IRoleService;
import com.tems.exception.ResourceNotFoundException;
import com.tems.model.Role;
import com.tems.Repository.RoleRepository;

@Service
public class RoleService implements IRoleService {


	    private final RoleRepository roleRepository;

	    public RoleService(RoleRepository roleRepository) {
	        this.roleRepository = roleRepository;
	    }
	    
	    @Override
	    public Role createRole(Role role) {

	        if (roleRepository.findByRoleName(role.getRoleName()).isPresent()) {
	            throw new RuntimeException("Role already exists with name: " + role.getRoleName());
	        }

	        return roleRepository.save(role);
	    }


	    @Override
	    public Role getRoleById(Integer roleId) {
	        return roleRepository.findById(roleId)
	                .orElseThrow(() -> 
	                    new ResourceNotFoundException("Role not found with id: " + roleId)
	                );
	    }

	    @Override
	    public Role getRoleByName(String roleName) {
	        return roleRepository.findByRoleName(roleName)
	                .orElseThrow(() -> 
	                    new ResourceNotFoundException("Role not found with name: " + roleName)
	                );
	    }

	    @Override
	    public List<Role> getAllRoles() {
	        return roleRepository.findAll();
	    }
	    
	    @Override
	    public void deleteRoleById(Integer roleId) {

	        Role role = roleRepository.findById(roleId)
	                .orElseThrow(() -> 
	                    new ResourceNotFoundException("Role not found with id: " + roleId)
	                );

	        roleRepository.delete(role);
	    }
	    
	    @Override
	    public Role updateRole(Integer roleId, Role role) {

	        Role existingRole = roleRepository.findById(roleId)
	                .orElseThrow(() -> 
	                    new ResourceNotFoundException("Role not found with id: " + roleId)
	                );

	        existingRole.setRoleName(role.getRoleName());


	        return roleRepository.save(existingRole);
	    }
}