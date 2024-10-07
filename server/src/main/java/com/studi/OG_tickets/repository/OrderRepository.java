package com.studi.OG_tickets.repository;

import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository  extends JpaRepository<Order, Long> {
  Optional<Order> findByUserAndFinalKey(UserEntity user, String finalKey);

  @Query("SELECT o FROM Order o JOIN FETCH o.user")
  List<Order> findAllAndFetchUserEagerly();
}
