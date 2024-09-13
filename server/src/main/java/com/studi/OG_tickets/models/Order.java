package com.studi.OG_tickets.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.studi.OG_tickets.dto.ProductFromOrderDto;
import com.studi.OG_tickets.services.ProductsConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "customer_order")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private UUID cur;

  private BigDecimal amount;

  private String status;

  private String invoice;

  private UUID key;

  private String finalKey;

//  @Lob
  @Column(columnDefinition = "BYTEA")
  private byte[] qrCode;

  @Convert(converter = ProductsConverter.class)
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "products", columnDefinition = "json")
  private List<ProductFromOrderDto> products;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(nullable = false, updatable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }
  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
