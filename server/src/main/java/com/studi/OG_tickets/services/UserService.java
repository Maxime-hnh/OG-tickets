package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.UserShortDto;
import com.studi.OG_tickets.dto.UserWithRoleDto;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.mappers.UserMapper;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  @Transactional
  public UserWithRoleDto getById(Long id) {
    UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("User not found"));
    return UserMapper.withRoleToDto(user);
  }

  @Transactional
  public UserWithRoleDto getByEmail(String email) {
    UserEntity user = userRepository.findByEmail(email)
            .orElseThrow(() -> new NotFoundException("User not found"));
    return UserMapper.withRoleToDto(user);
  }

  public boolean userEntityExistByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  @Transactional
  public UserEntity getEntityByEmail(String email) {
    return userRepository.findByEmail(email)
            .orElseThrow(() -> new NotFoundException("User not found"));
  }

  @Transactional
  public UserShortDto updateUser2FACode(UserEntity user, String code) {
    user.setTwoFactorCode(code);
    UserEntity updatedUser = userRepository.save(user);
    return UserMapper.toShortDto(updatedUser);
  }

  public void clearTwoFactorCode(Long id) {
    UserEntity user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    user.setTwoFactorCode(null);
    userRepository.save(user);
  }
}
