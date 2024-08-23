package com.studi.OG_tickets.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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

  private boolean active;

  @Enumerated(EnumType.STRING)
  private Status status;

  @Enumerated(EnumType.STRING)
  private Category category;

  public enum Category {
    SOLO, DUO, FAMILIALE
  }

  public enum Status {
    AVAILABLE, UNAVAILABLE
  }
}
