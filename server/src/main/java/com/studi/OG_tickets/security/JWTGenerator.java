package com.studi.OG_tickets.security;

import io.jsonwebtoken.*;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

import static com.studi.OG_tickets.security.SecurityConstants.JWT_SECRET;


@Component
public class JWTGenerator {

  public String generateToken(String email) {

    Date currentDate = new Date();
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(currentDate);
    calendar.add(Calendar.HOUR, 24);

    Date expireDate = calendar.getTime();

    return Jwts.builder()
            .subject(email)
            .signWith(JWT_SECRET)
            .issuedAt(new Date())
            .expiration(expireDate)
            .compact();
  }

  public String getEmailFromToken(String token) {
    try {
      Jws<Claims> claims = Jwts.parser()
              .verifyWith(JWT_SECRET)
              .build()
              .parseSignedClaims(token);
      return claims.getPayload().getSubject();
    } catch (JwtException | IllegalArgumentException e) {
      return e.getMessage();
    }
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser()
              .verifyWith(JWT_SECRET)
              .build()
              .parseSignedClaims(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
    }
  }

  //test
  private Boolean isTokenExpired(String token) {
    try {
      Date expirationDate = Jwts.parser()
              .verifyWith(JWT_SECRET)
              .build()
              .parseSignedClaims(token)
              .getPayload()
              .getExpiration();
      return expirationDate.before(new Date());
    } catch (JwtException | IllegalArgumentException e) {
      throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
    }
  }
}
