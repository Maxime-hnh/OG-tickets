package com.studi.OG_tickets.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QrCodeContentDto {

  private Long userId;
  private String finalKey;
  private String orderDate;
}
