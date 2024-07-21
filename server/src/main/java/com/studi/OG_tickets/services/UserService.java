package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.UserDto;
import com.studi.OG_tickets.mappers.UserMapper;
import com.studi.OG_tickets.models.User;
import com.studi.OG_tickets.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  @Async
  public CompletableFuture<UserDto> signUp(UserDto userDto) {
    return CompletableFuture.supplyAsync(() -> {
      User user = UserMapper.toEntity(userDto);
      User newUser = userRepository.save(user);
      return UserMapper.toDto(newUser);
    });
  }

  @Async
  public CompletableFuture<UserDto> getById(Long id) {
    return CompletableFuture.supplyAsync(() -> {
      User user = userRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("User not found"));
      return UserMapper.toDto(user);
    });
  }
}
