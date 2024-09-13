package com.studi.OG_tickets.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductFromOrderDto {

  private Long id;
  private BigDecimal price;
  private Integer quantity;
}
