package com.geopoliticsai.api;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
@Component public class JwtFilter extends OncePerRequestFilter {
  private final TokenService tokens;
  public JwtFilter(TokenService tokens) { this.tokens=tokens; }
  @Override protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain) throws java.io.IOException,jakarta.servlet.ServletException {
    String header=request.getHeader(HttpHeaders.AUTHORIZATION);
    if(header!=null&&header.startsWith("Bearer ")) try { String token=header.substring(7); var auth=new UsernamePasswordAuthenticationToken(tokens.email(token),null,java.util.List.of(new SimpleGrantedAuthority("ROLE_"+tokens.role(token).toUpperCase()))); SecurityContextHolder.getContext().setAuthentication(auth); } catch(Exception ignored) { SecurityContextHolder.clearContext(); }
    chain.doFilter(request,response);
  }
}
