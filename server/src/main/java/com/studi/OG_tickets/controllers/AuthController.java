package com.studi.OG_tickets.controllers;

import com.studi.OG_tickets.dto.*;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {

  private AuthService authService;

  @PostMapping("/login/step/0")
  public ResponseEntity<UserShortDto> login(@RequestBody LoginDto body) {
    try {
      UserShortDto userShortDto = authService.login(body);
      return ResponseEntity.ok(userShortDto);
    } catch (BadRequestException e) {
      throw new BadRequestException("Invalid username or password");
    }
  }

  @PostMapping("/login/step/1")
  public ResponseEntity<AuthResponseDto> login(@RequestBody TwoFactorVerificationDto body) {
    try {
    AuthResponseDto authResponseDto = authService.checkTwoFactorCode(body.getUserId(), body.getTwoFactorCode());
    return ResponseEntity.ok(authResponseDto);
    } catch (BadRequestException e) {
      throw new BadRequestException(e.getMessage());
    }
  }

  @PostMapping("/signup")
  public ResponseEntity<UserDto> registerUser(@RequestBody RegisterDto registerDto) {
    try {
      UserDto newUser = authService.register(registerDto);
      return ResponseEntity.ok().body(newUser);
    } catch (BadRequestException e) {
      throw new BadRequestException(e.getMessage());
    }
  }

  @PostMapping("/refreshToken")
  public ResponseEntity<AuthResponseDto> refreshToken(@RequestBody RefreshTokenRequestDto refreshTokenRequestDto) {
    try {
      return ResponseEntity.ok(authService.refreshAccessToken(refreshTokenRequestDto.getRefreshToken()));
    } catch (BadRequestException e) {
      throw new BadRequestException(e.getMessage());
    }
  }
}
