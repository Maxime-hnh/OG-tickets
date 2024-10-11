package com.studi.OG_tickets.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

  private JwtAuthEntryPoint authEntryPoint;
  private CustomUserDetailsService userDetailsService;
  private JWTGenerator tokenGenerator;

  @Bean
  public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
    http
            .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(exceptionHandling -> exceptionHandling
                    .authenticationEntryPoint(authEntryPoint))
            .sessionManagement(sessionManagement -> sessionManagement
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .securityMatcher("/**")
            .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers( "/api/auth/login/step/**", "/api/auth/refreshToken").permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/product/create").hasAuthority("ADMIN")
                    .requestMatchers(HttpMethod.PUT,"/api/product/{id}").hasAuthority("ADMIN")
                    .requestMatchers(HttpMethod.DELETE,"/api/product/{id}").hasAuthority("ADMIN")
                    .requestMatchers(HttpMethod.POST,"/api/order/create/user/{userId}").hasAnyAuthority("USER", "ADMIN")
                    .requestMatchers(HttpMethod.PUT,"/api/order/validate/{orderId}/user/{userId}").hasAnyAuthority("USER", "ADMIN")
                    .requestMatchers(HttpMethod.GET,"/api/order/all").hasAuthority("ADMIN")
                    .requestMatchers(HttpMethod.GET,"/api/order/allWithUser").hasAuthority("ADMIN")
                    .requestMatchers(HttpMethod.POST,"/api/qrcode/scan").hasAuthority("ADMIN")
                    .anyRequest().permitAll()
            );
    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(
          AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
    }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JWTAuthenticationFilter jwtAuthenticationFilter() {
    return new JWTAuthenticationFilter(tokenGenerator, userDetailsService);
  }

}
