package com.studi.OG_tickets.dto;

import lombok.Data;

@Data
public class LoginDto {
  private String email;
  private String password;

  private Long userId;
  private String twoFactorCode;
}
