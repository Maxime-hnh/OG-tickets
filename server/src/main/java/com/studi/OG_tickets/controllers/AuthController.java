package com.studi.OG_tickets.controllers;

import com.studi.OG_tickets.dto.*;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {

  private AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
    try {
      AuthResponseDto response = authService.login(loginDto);
      return ResponseEntity.ok(response);
    } catch (BadRequestException e) {
      throw new BadRequestException("Invalid username or password");
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
