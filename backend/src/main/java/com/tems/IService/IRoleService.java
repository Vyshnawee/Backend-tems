package com.tems.IService;

import java.util.List;

import com.tems.model.Role;

public interface IRoleService {
	
	Role createRole(Role role);
	
	Role getRoleById(Integer roleId);

    Role getRoleByName(String roleName);

    List<Role> getAllRoles();
    
    void deleteRoleById(Integer roleId);
    
    Role updateRole(Integer roleId, Role role);
}
