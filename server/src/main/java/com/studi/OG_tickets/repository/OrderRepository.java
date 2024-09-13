package com.studi.OG_tickets.repository;

import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository  extends JpaRepository<Order, Long> {
  Optional<Order> findByUserAndFinalKey(UserEntity user, String finalKey);
}
