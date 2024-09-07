package com.studi.OG_tickets.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Base64;

public class SecurityConstants {



//  private static final String SECRET_KEY_BASE64 = System.getenv("JWT_SECRET_KEY");
  private static final String SECRET_KEY = "b+wqMmoy8sZOHgc+54v6Gg1D775/BE8itC8CgmHN/nYcoE4rtF678pShIUTXIvg57XU7tNlgZjtlTtfhwWTbDtE/qwhpnItLnwhHzQwtxg6W0age7FY/FPpwdsn9HbA3b+cWMpGbx/rCrXH4wCzq4M+5qCqpSdJSXDFrA08MInm3KlU1GQTeBtjNXSYntk9UdFGTYByUj3BEHuDBTSzV+V6UCFPhkUvr3svRSPH9NWYISWweR9OC5x6yEUaVGRb9bbXx01XrVxQZNpGMPlbVf7sGszZXi5sbWaUb5GpXKjFdaZv1yozHc8vAab94mkC/ewKhBROa6RbdsrbzXFCkTdgy/ZOpGjFFkMPC67KjYJk=";

  public static final SecretKey JWT_SECRET = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET_KEY));



}
