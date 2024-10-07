package com.studi.OG_tickets.dto;

import lombok.Data;

@Data
public class UserShortDto {
  private Long id;

  private String firstName;
  private String lastName;
  private String email;
}
