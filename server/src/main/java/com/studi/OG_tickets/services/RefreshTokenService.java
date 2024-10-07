package com.studi.OG_tickets.services;

import com.studi.OG_tickets.models.RefreshToken;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.RefreshTokenRepository;
import com.studi.OG_tickets.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepository;
  private final UserRepository userRepository;

  public RefreshToken createRefreshToken(String email) {
    RefreshToken refreshToken = RefreshToken.builder()
            .userInfo(userRepository.findByEmail(email).isPresent() ? userRepository.findByEmail(email).get() : null)
            .token(UUID.randomUUID().toString())
            .expiryDate(calculateExpiryDate())
            .build();
    return refreshTokenRepository.save(refreshToken);
  }

  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findByToken(token);
  }

  public Optional<RefreshToken> findByUserEmail(String email) {
    Optional<UserEntity> userOptional = userRepository.findByEmail(email);
    return userOptional.flatMap(refreshTokenRepository::findByUserInfo);
  }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void cleanUpExpiredToken(RefreshToken refreshToken) {
    refreshTokenRepository.delete(refreshToken);
  }

  public Boolean isTokenExpired(RefreshToken refreshToken) {
    return refreshToken.getExpiryDate().isBefore(Instant.now());
  }

  public RefreshToken verifyExpiration(RefreshToken refreshToken) {
    if (this.isTokenExpired(refreshToken)) {
      throw new RuntimeException(" Refresh token is expired, please make a new login.");
    }
    return refreshToken;
  }

  private Instant calculateExpiryDate() {
    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.DAY_OF_MONTH, 14);
    return cal.getTime().toInstant();
  }
}
