package com.studi.OG_tickets.repository;

import com.studi.OG_tickets.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByEmail(String username);
  Boolean existsByEmail(String username);

  Optional<UserEntity> findByUserName(String username);
    Boolean existsByUserName(String username);
}
