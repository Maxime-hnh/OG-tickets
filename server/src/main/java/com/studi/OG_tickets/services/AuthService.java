package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.*;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.models.Role;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.UserRepository;
import com.studi.OG_tickets.security.CustomUserDetailsService;
import com.studi.OG_tickets.security.JWTGenerator;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

  private final RoleService roleService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private JWTGenerator jwtGenerator;


  @Transactional
  public String register(RegisterDto registerDto) {
    boolean exists = userService.userEntityExistByEmail(registerDto.getEmail());
    if(!exists) {
      UserEntity user = new UserEntity();
      user.setFirstName(registerDto.getFirstName());
      user.setLastName(registerDto.getLastName());
      user.setEmail(registerDto.getEmail());
      user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
      user.setKey(UUID.randomUUID());

      Role roles = roleService.getByName(Role.RoleName.USER);
      user.setRoles(Collections.singletonList(roles));

      userRepository.save(user);
      return "User registered successfully with email: " + user.getEmail();
    } else {
      throw new BadRequestException("User already exists with email: " + registerDto.getEmail());
    }
  }

  @Transactional
  public AuthResponseDto login(LoginDto loginDto) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(), loginDto.getPassword()
            )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String token = jwtGenerator.generateToken(authentication);

    UserWithRoleDto loggedUser = userService.getByEmail(loginDto.getEmail());


    return new AuthResponseDto(
            token,
            loggedUser.getId(),
            loggedUser.getEmail(),
            loggedUser.getFirstName(),
            loggedUser.getLastName(),
            loggedUser.getRoles()
    );
  }
}
