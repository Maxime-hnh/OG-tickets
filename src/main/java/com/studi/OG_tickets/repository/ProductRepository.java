package com.studi.OG_tickets.repository;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}