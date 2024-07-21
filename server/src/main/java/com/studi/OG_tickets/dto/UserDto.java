package com.studi.OG_tickets.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private String role;
  private UUID key;
}
