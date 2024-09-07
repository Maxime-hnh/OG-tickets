package com.studi.OG_tickets.security;

import com.studi.OG_tickets.exceptions.InternalServerException;
import com.studi.OG_tickets.exceptions.UnauthorizedException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

  private JWTGenerator tokenGenerator;
  private CustomUserDetailsService customUserDetailsService;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
                                  @NonNull HttpServletResponse response,
                                  @NonNull FilterChain filterChain)
          throws ServletException, IOException {
    try {

    String token = getJWTFromRequest(request);
    if (StringUtils.hasText(token) && tokenGenerator.validateToken(token)) {
      String email = tokenGenerator.getEmailFromToken(token);

      UserDetails userDetails = customUserDetailsService.loadUserByUsername(email); //loadUserByEmail

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,
              null, userDetails.getAuthorities()
      );
      authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
    filterChain.doFilter(request, response);
    } catch (AuthenticationCredentialsNotFoundException e) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.setContentType("application/json");
      response.getWriter().write("{\"error\": \"Unauthorized: JWT was expired or incorrect\"}");
    } catch (Exception e) {
      throw new InternalServerException(e.getMessage(), e.getCause());
    }
  }

  private String getJWTFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}
