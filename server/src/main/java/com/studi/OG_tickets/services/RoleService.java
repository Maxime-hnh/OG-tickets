package com.studi.OG_tickets.services;

import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.models.Role;
import com.studi.OG_tickets.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleService {

  private RoleRepository roleRepository;

  public Role getByName(Role.RoleName name) {
    return roleRepository.findByName(name)
            .orElseThrow(() -> new NotFoundException("Role not found"));
  }

}
