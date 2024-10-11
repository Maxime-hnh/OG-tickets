package com.studi.OG_tickets.dto;

import lombok.Data;

@Data
public class TwoFactorVerificationDto {
  private Long userId;
  private String twoFactorCode;
}
