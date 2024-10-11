package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.*;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.mappers.UserMapper;
import com.studi.OG_tickets.models.RefreshToken;
import com.studi.OG_tickets.models.Role;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.UserRepository;
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
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

  private final RoleService roleService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final JWTGenerator jwtGenerator;
  private final RefreshTokenService refreshTokenService;
  private EmailService emailService;

  @Transactional
  public UserDto register(RegisterDto registerDto) {
    boolean exists = userService.userEntityExistByEmail(registerDto.getEmail());
    if (!exists) {
      UserEntity user = new UserEntity();
      user.setFirstName(registerDto.getFirstName());
      user.setLastName(registerDto.getLastName());
      user.setEmail(registerDto.getEmail());
      user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
      user.setKey(UUID.randomUUID());

      Role roles = roleService.getByName(Role.RoleName.USER);
      user.setRoles(Collections.singletonList(roles));

      UserEntity newUser = userRepository.save(user);
      return UserMapper.toDto(newUser);
    } else {
      throw new BadRequestException("User already exists with email: " + registerDto.getEmail());
    }
  }

  @Transactional
  public UserShortDto login(LoginDto loginDto) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(), loginDto.getPassword()
            )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserEntity user = userService.getEntityByEmail(authentication.getName());
    String twoFactoCode = emailService.generateAlphaNumericCode();
    emailService.send2FAMail(authentication.getName(), twoFactoCode); //email
    return userService.updateUser2FACode(user, twoFactoCode);
  }

  @Transactional
  public AuthResponseDto checkTwoFactorCode(Long id, String twoFactorCode) {
    UserWithRoleDto user = userService.getById(id);
    if (user.getTwoFactorCode().equals(twoFactorCode)) {
      String token = jwtGenerator.generateToken(user.getEmail());
      Optional<RefreshToken> existingRefreshToken = refreshTokenService.findByUserEmail(user.getEmail());
      RefreshToken refreshTokenResponse;
      if (existingRefreshToken.isEmpty() || refreshTokenService.isTokenExpired(existingRefreshToken.get())) {
        existingRefreshToken.ifPresent(refreshTokenService::cleanUpExpiredToken);
        refreshTokenResponse = refreshTokenService.createRefreshToken(user.getEmail());
      } else {
        refreshTokenResponse = existingRefreshToken.get();
      }
      userService.clearTwoFactorCode(id);

      return new AuthResponseDto(
              token,
              refreshTokenResponse.getToken(),
              user.getId(),
              user.getEmail(),
              user.getFirstName(),
              user.getLastName(),
              user.getRole()
      );
    } else {
      throw new BadRequestException("Two factor code does not match");
    }
  }

  @Transactional
  public AuthResponseDto refreshAccessToken(String refreshToken) {
    return refreshTokenService.findByToken(refreshToken)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUserInfo)
            .map(user -> {
              String token = jwtGenerator.generateToken(user.getEmail());
              return new AuthResponseDto(
                      token,
                      refreshToken,
                      user.getId(),
                      user.getEmail(),
                      user.getFirstName(),
                      user.getLastName(),
                      user.getRoles().get(0).getName()
              );
            })
            .orElseThrow(() -> new NotFoundException(refreshToken + ": Refresh token is not in database!"));
  }
}