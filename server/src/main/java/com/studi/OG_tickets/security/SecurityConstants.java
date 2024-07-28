package com.studi.OG_tickets.security;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;

public class SecurityConstants {

  public static final SecretKey JWT_SECRET = Jwts.SIG.HS256.key().build();
}
