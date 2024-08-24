package com.studi.OG_tickets.services;

import com.studi.OG_tickets.models.RefreshToken;
import com.studi.OG_tickets.repository.RefreshTokenRepository;
import com.studi.OG_tickets.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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

  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(token);
      throw new RuntimeException(token.getToken() + " Refresh token is expired, please make a new login.");
    }
    return token;
  }

  private Instant calculateExpiryDate() {
    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.DAY_OF_MONTH, 14);
    return cal.getTime().toInstant();
  }
}
