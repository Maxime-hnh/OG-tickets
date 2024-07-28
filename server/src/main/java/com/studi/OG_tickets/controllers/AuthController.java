package com.studi.OG_tickets.controllers;

import com.studi.OG_tickets.dto.AuthResponseDto;
import com.studi.OG_tickets.dto.LoginDto;
import com.studi.OG_tickets.dto.RegisterDto;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.security.JWTGenerator;
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
  private JWTGenerator jwtGenerator;

  @PostMapping("/login")
  public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {
   try {
     AuthResponseDto response = authService.login(loginDto);
     return ResponseEntity.ok(response);
   } catch(BadRequestException e) {
     throw new BadRequestException("Invalid username or password");
    }
  }

  @PostMapping("/register")
  public ResponseEntity<String> registerUser(@RequestBody RegisterDto registerDto) {
    try {
      String response = authService.register(registerDto);
      return ResponseEntity.ok(response);
    } catch (BadRequestException e) {
      throw new BadRequestException(e.getMessage());
    }
  }
}
