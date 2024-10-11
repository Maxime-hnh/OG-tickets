package com.studi.OG_tickets.controllers;

import com.studi.OG_tickets.dto.*;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.services.AuthService;
import com.studi.OG_tickets.services.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {

  private AuthService authService;

  @PostMapping("/login/step/{step}")
  public ResponseEntity<?> login(@PathVariable Integer step, @RequestBody LoginDto body) {
    try {
      switch (step) {
        case 0:
          try {
            UserShortDto userShortDto = authService.login(body);
            return ResponseEntity.ok(userShortDto);
          } catch (BadRequestException e) {
            throw new BadRequestException("Invalid username or password");
          }
        case 1:
          AuthResponseDto authResponseDto = authService.checkTwoFactorCode(body.getUserId(), body.getTwoFactorCode());
          return ResponseEntity.ok(authResponseDto);
        default:
          break;
      }
    } catch (BadRequestException e) {
      throw new BadRequestException(e.getMessage());
    }
    return null;
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
