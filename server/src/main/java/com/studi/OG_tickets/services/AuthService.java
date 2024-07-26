package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.RegisterDto;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.models.Role;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class AuthService {

  private final RoleService roleService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserService userService;

  @Transactional
  public String register(RegisterDto registerDto) {
    boolean exists = userService.userEntityExistByEmail(registerDto.getEmail());
    if(!exists) {
      UserEntity user = new UserEntity();
      user.setFirstName(registerDto.getFirstName());
      user.setLastName(registerDto.getLastName());
      user.setUserName(registerDto.getFirstName() + " " + registerDto.getLastName());
      user.setEmail(registerDto.getEmail());
      user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

      Role roles = roleService.getByName("USER");
      user.setRoles(Collections.singletonList(roles));

      userRepository.save(user);
      return "User registered successfully with email: " + user.getEmail();
    } else {
      throw new BadRequestException("User already exists with email: " + registerDto.getEmail());
    }
  }
}
