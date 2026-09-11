package com.geopoliticsai.api;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
@RestController @RequestMapping("/api/auth") public class AuthController {
  private final UserRepository users; private final PasswordEncoder passwords; private final TokenService tokens;
  @Value("$" + "{APP_ADMIN_EMAIL}") String adminEmail; @Value("$" + "{APP_ADMIN_PASSWORD}") String adminPassword;
  public AuthController(UserRepository users,PasswordEncoder passwords,TokenService tokens){this.users=users;this.passwords=passwords;this.tokens=tokens;}
  @PostConstruct void seedAdmin(){if(users.findByEmail(adminEmail).isEmpty())users.save(new User(null,"Platform Admin",adminEmail,passwords.encode(adminPassword),"admin"));}
  @PostMapping("/register") public Response register(@Valid @RequestBody Register input){if(users.findByEmail(input.email()).isPresent())throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already registered");User u=users.save(new User(null,input.name(),input.email(),passwords.encode(input.password()),"student"));return response(u);}
  @PostMapping("/login") public Response login(@Valid @RequestBody Login input){User u=users.findByEmail(input.email()).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid credentials"));if(!passwords.matches(input.password(),u.passwordHash()))throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid credentials");return response(u);}
  private Response response(User u){return new Response(tokens.issue(u),u.name(),u.email(),u.role());}
  record Register(@NotBlank String name,@Email @NotBlank String email,@NotBlank String password){} record Login(@Email @NotBlank String email,@NotBlank String password){} record Response(String accessToken,String name,String email,String role){}
}
