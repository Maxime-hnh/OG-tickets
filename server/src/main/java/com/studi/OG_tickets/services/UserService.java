package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.UserDto;
import com.studi.OG_tickets.mappers.UserMapper;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  @Async
  public CompletableFuture<UserDto> getById(Long id) {
    return CompletableFuture.supplyAsync(() -> {
      UserEntity user = userRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("User not found"));
      return UserMapper.toDto(user);
    });
  }

  @Async
  public CompletableFuture<Optional<UserEntity>> getUserEntityById(Long id) {
    return CompletableFuture.supplyAsync(() -> userRepository.findById(id));
  }

  public boolean userEntityExistByEmail(String email) {
    return userRepository.existsByEmail(email);
  }
}
