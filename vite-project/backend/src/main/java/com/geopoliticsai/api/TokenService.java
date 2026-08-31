package com.geopoliticsai.api;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service public class TokenService {
  private final SecretKey key;
  public TokenService(@Value("$" + "{APP_JWT_SECRET}") String secret) { key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); }
  public String issue(User user) { return Jwts.builder().subject(user.email()).claim("role",user.role()).issuedAt(Date.from(Instant.now())).expiration(Date.from(Instant.now().plusSeconds(3600))).signWith(key).compact(); }
  public String email(String token) { return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject(); }
  public String role(String token) { return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().get("role",String.class); }
}
