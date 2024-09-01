package com.studi.OG_tickets.models;

import com.studi.OG_tickets.dto.ProductDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private UUID cur;

  @Column(nullable = false)
  private String name;

  @Column(length = 500)
  private String description;

  private String image;

  private BigDecimal price;

  private Integer stock = 1000;

  private String city;

  private String venue;

  private String stage;

  private Boolean visible;

  private LocalDate date;

  private LocalTime  startTime;

  private LocalTime endTime;

  @Enumerated(EnumType.STRING)
  private Category category;

  public enum Category {
    SOLO, DUO, FAMILIALE
  }

  public void updateFromDto(ProductDto dto) {
    if (dto.getName() != null) this.name = dto.getName();
    if (dto.getDescription() != null) this.description = dto.getDescription();
    if (dto.getPrice() != null) this.price = dto.getPrice();
    if (dto.getCategory() != null) this.category = dto.getCategory();
    if (dto.getStock() != null) this.stock = dto.getStock();
    if (dto.getCity() != null) this.city = dto.getCity();
    if (dto.getStage() != null) this.stage = dto.getStage();
    if (dto.getVisible() != null) this.visible = dto.getVisible();
    if (dto.getDate() != null) this.date = dto.getDate();
    if (dto.getStartTime() != null) this.startTime = dto.getStartTime();
    if (dto.getEndTime() != null) this.endTime = dto.getEndTime();
  }
}
