package com.studi.OG_tickets.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

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
            .signWith(SecurityConstants.JWT_SECRET)
            .issuedAt(new Date())
            .expiration(expireDate)
            .compact();
  }

  public String getEmailFromToken(String token) {
    try {
      Jws<Claims> claims = Jwts.parser()
              .verifyWith(SecurityConstants.JWT_SECRET)
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
              .verifyWith(SecurityConstants.JWT_SECRET)
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
              .verifyWith(SecurityConstants.JWT_SECRET)
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
