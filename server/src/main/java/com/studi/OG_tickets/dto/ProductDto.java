package com.studi.OG_tickets.dto;

import com.studi.OG_tickets.models.Product;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class ProductDto {
  private Long id;
  private UUID cur;

  private String name;
  private String description;
  private String image;
  private BigDecimal price;
  private Integer stock;
  private boolean active;
  private Product.Status status;
  private Product.Category category;
}
