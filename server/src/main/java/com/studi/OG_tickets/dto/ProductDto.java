package com.studi.OG_tickets.dto;

import com.studi.OG_tickets.models.Product;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class ProductDto {
  private Long id;
  private UUID cur;

  private String name;
  private String description;
  private BigDecimal price;
  private String image;
  private Integer stock;
  private String city;
  private String venue;
  private String stage;
  private Boolean visible;
  private LocalDate date;
  private LocalTime startTime;
  private LocalTime endTime;
  private Product.Category category;
}
