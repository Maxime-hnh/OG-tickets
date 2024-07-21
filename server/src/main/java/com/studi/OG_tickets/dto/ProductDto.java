package com.studi.OG_tickets.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
  private Long id;
  private String name;
  private String description;
  private BigDecimal price;
  private Integer stock;
  private Integer category;
  private String image;
  private boolean active;
}
