package com.studi.OG_tickets.security;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Base64;

public class SecurityConstants {

  //  private static final Dotenv dotenv = Dotenv.configure().directory("server").load();
  private static final Dotenv dotenv = Dotenv.load();
  private static final String SECRET_KEY = dotenv.get("JWT_SECRET_KEY");

  static {
    if (SECRET_KEY == null || SECRET_KEY.isEmpty()) {
      System.err.println("⚠ JWT_SECRET_KEY is null or empty");
    } else {
      System.out.println("✅ JWT_SECRET_KEY loaded successfully: " + SECRET_KEY);
    }
  }

  public static final SecretKey JWT_SECRET = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET_KEY));
}
