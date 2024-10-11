package com.studi.OG_tickets.dto;

import com.studi.OG_tickets.models.Role;
import lombok.Data;

import java.util.UUID;

@Data
public class UserWithRoleDto {
  private Long id;
  private UUID key;

  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private Role.RoleName role;
  private String twoFactorCode;

}
