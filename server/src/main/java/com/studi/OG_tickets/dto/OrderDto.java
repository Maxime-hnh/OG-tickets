package com.studi.OG_tickets.dto;

import com.studi.OG_tickets.models.UserEntity;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class OrderDto {
  private Long id;
  private UUID cur;

  private BigDecimal amount;
  private String status;
  private String invoice;
  private UUID key;
  private String finalKey;
  private byte[] qrCode;
  private List<ProductFromOrderDto> products;

  private Long userId;
}
