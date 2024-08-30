package com.studi.OG_tickets.dto;

import com.studi.OG_tickets.models.Role;
import lombok.Data;

import java.util.List;

@Data
public class AuthResponseDto {
  private String accessToken;
  private String refreshToken;
  private String tokenType = "Bearer ";
  private Long id;
  private String email;
  private String firstName;
  private String lastName;
  private Role.RoleName role;

  public AuthResponseDto(String accessToken, String refreshToken, Long id, String email, String firstName, String lastName, Role.RoleName role) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
