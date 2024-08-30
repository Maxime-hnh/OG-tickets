package com.studi.OG_tickets.repository;

import com.studi.OG_tickets.models.RefreshToken;
import com.studi.OG_tickets.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);

  Optional<RefreshToken> findByUserInfo(UserEntity userInfo);
}
