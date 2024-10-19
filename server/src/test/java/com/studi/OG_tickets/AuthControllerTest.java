package com.studi.OG_tickets;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studi.OG_tickets.controllers.AuthController;
import com.studi.OG_tickets.dto.*;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.models.Role;
import com.studi.OG_tickets.services.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

  private MockMvc mockMvc;

  @Mock
  private AuthService authService;

  @InjectMocks
  private AuthController authController;

  @BeforeEach
  public void setup() {
    mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
  }

  @Test
  public void registerUser_WhenSuccess_ReturnsOk() throws Exception {
    // Mock le DTO d'inscription
    RegisterDto registerDto = new RegisterDto();
    registerDto.setFirstName("John");
    registerDto.setLastName("Doe");
    registerDto.setEmail("john.doe@example.com");
    registerDto.setPassword("Password123");

    // Mock le DTO de retour de l'utilisateur créé
    UserDto newUserDto = new UserDto();
    newUserDto.setFirstName("John");
    newUserDto.setLastName("Doe");
    newUserDto.setEmail("john.doe@example.com");

    // Simule le comportement du service d'authentification
    given(authService.register(registerDto)).willReturn(newUserDto);

    // Exécute la requête POST et vérifie les résultats
    mockMvc.perform(post("/api/auth/signup")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(registerDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(newUserDto)));
  }

  @Test
  public void registerUser_WhenUserAlreadyExists_ThrowsBadRequest() throws Exception {
    // Mock le DTO d'inscription
    RegisterDto registerDto = new RegisterDto();
    registerDto.setFirstName("John");
    registerDto.setLastName("Doe");
    registerDto.setEmail("john.doe@example.com");
    registerDto.setPassword("securePassword");

    // Simule une exception "User already exists"
    given(authService.register(registerDto)).willThrow(new BadRequestException("User already exists with email: john.doe@example.com"));

    // Exécute la requête POST et vérifie que la réponse est une erreur 400
    mockMvc.perform(post("/api/auth/signup")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(registerDto)))
            .andExpect(status().isBadRequest());
  }

  @Test
  public void loginStep0_WhenUserIsRegularUser_ReturnsSuccess() throws Exception {
    // Mock les données du LoginDto
    LoginDto loginDto = new LoginDto();
    loginDto.setEmail("john.doe@example.com");
    loginDto.setPassword("Password123");

    // Mock les données du UserShortDto
    UserShortDto userShortDto = new UserShortDto();
    userShortDto.setEmail("john.doe@example.com");
    userShortDto.setFirstName("John");
    userShortDto.setLastName("Doe");

    // Simule le comportement du service d'authentification pour un utilisateur régulier
    given(authService.login(any(LoginDto.class))).willReturn(userShortDto);

    // Exécute la requête POST et vérifie les résultats
    mockMvc.perform(post("/api/auth/login/step/0")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(loginDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(userShortDto)));
  }

  @Test
  public void loginStep0_WhenUserIsAdmin_ReturnsSuccess() throws Exception {
    // Mock les données du LoginDto
    LoginDto loginDto = new LoginDto();
    loginDto.setEmail("admin@example.com");
    loginDto.setPassword("Password123");

    // Mock les données du UserShortDto
    UserShortDto adminDto = new UserShortDto();
    adminDto.setEmail("admin@example.com");
    adminDto.setFirstName("Admin");
    adminDto.setLastName("Doe");

    // Simule le comportement du service d'authentification pour un administrateur
    given(authService.login(any(LoginDto.class))).willReturn(adminDto);

    // Exécute la requête POST et vérifie les résultats
    mockMvc.perform(post("/api/auth/login/step/0")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(loginDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(adminDto)));
  }

  @Test
  public void loginStep0_WhenCredentialsAreInvalid_ThrowsBadRequest() throws Exception {
    // Mock les données du LoginDto
    LoginDto loginDto = new LoginDto();
    loginDto.setEmail("invalid@example.com");
    loginDto.setPassword("wrongPassword");

    // Simule une exception "Invalid username or password"
    given(authService.login(any(LoginDto.class)))
            .willThrow(new BadRequestException("Invalid username or password"));

    // Exécute la requête POST et vérifie que la réponse est une erreur 400
    mockMvc.perform(post("/api/auth/login/step/0")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(loginDto)))
            .andExpect(status().isBadRequest());
  }

  @Test
  public void loginStep1_WhenTwoFactorCodeIsValid_ReturnsSuccess() throws Exception {
    // Mock des données de la requête TwoFactorVerificationDto
    TwoFactorVerificationDto verificationDto = new TwoFactorVerificationDto();
    verificationDto.setUserId(1L);
    verificationDto.setTwoFactorCode("123456");

    // Mock des données de la réponse AuthResponseDto
    AuthResponseDto authResponseDto = new AuthResponseDto(
            "jwtToken",
            "refreshToken",
            1L,
            "john.doe@example.com",
            "John",
            "Doe",
            Role.RoleName.USER);

    // Simule le comportement du service d'authentification
    given(authService.checkTwoFactorCode(anyLong(), anyString())).willReturn(authResponseDto);

    // Exécute la requête POST et vérifie les résultats
    mockMvc.perform(post("/api/auth/login/step/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(verificationDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(authResponseDto)));
  }

  @Test
  public void loginStep1_WhenTwoFactorCodeIsInvalid_ThrowsBadRequest() throws Exception {
    // Mock des données de la requête TwoFactorVerificationDto
    TwoFactorVerificationDto verificationDto = new TwoFactorVerificationDto();
    verificationDto.setUserId(1L);
    verificationDto.setTwoFactorCode("123456");

    // Simule une exception "Two factor code does not match"
    given(authService.checkTwoFactorCode(anyLong(), anyString()))
            .willThrow(new BadRequestException("Two factor code does not match"));

    // Exécute la requête POST et vérifie que la réponse est une erreur 400
    mockMvc.perform(post("/api/auth/login/step/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(verificationDto)))
            .andExpect(status().isBadRequest());
  }

  @Test
  public void loginStep1_WhenRefreshTokenIsReusedOrNewCreated_ReturnsSuccess() throws Exception {
    // Mock des données de la requête TwoFactorVerificationDto
    TwoFactorVerificationDto verificationDto = new TwoFactorVerificationDto();
    verificationDto.setUserId(1L);
    verificationDto.setTwoFactorCode("123456");

    // Mock des données de la réponse AuthResponseDto (cas où le jeton de rafraîchissement est réutilisé ou créé)
    AuthResponseDto authResponseDto = new AuthResponseDto(
            "jwtToken",
            "newOrExistingRefreshToken",
            1L,
            "john.doe@example.com",
            "John",
            "Doe",
            Role.RoleName.USER);

    // Simule le comportement du service d'authentification
    given(authService.checkTwoFactorCode(anyLong(), anyString())).willReturn(authResponseDto);

    // Exécute la requête POST et vérifie que le jeton de rafraîchissement est généré ou réutilisé
    mockMvc.perform(post("/api/auth/login/step/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(verificationDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(authResponseDto)));
  }

  @Test
  public void refreshToken_WhenTokenIsValid_ReturnsSuccess() throws Exception {
    // Mock les données de la requête RefreshTokenRequestDto
    RefreshTokenRequestDto requestDto = new RefreshTokenRequestDto();
    requestDto.setRefreshToken("validRefreshToken");

    // Mock des données de la réponse AuthResponseDto
    AuthResponseDto authResponseDto = new AuthResponseDto(
            "newAccessToken",
            "validRefreshToken",
            1L,
            "john.doe@example.com",
            "John",
            "Doe",
            Role.RoleName.USER);

    // Simule le comportement du service d'authentification
    given(authService.refreshAccessToken(requestDto.getRefreshToken())).willReturn(authResponseDto);

    // Exécute la requête POST et vérifie les résultats
    mockMvc.perform(post("/api/auth/refreshToken")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(requestDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(authResponseDto)));
  }

  @Test
  public void refreshToken_WhenTokenNotFound_ThrowsNotFoundException() throws Exception {
    // Mock les données de la requête RefreshTokenRequestDto
    RefreshTokenRequestDto requestDto = new RefreshTokenRequestDto();
    requestDto.setRefreshToken("invalidRefreshToken");

    // Simule une exception NotFoundException pour un jeton introuvable
    given(authService.refreshAccessToken(requestDto.getRefreshToken()))
            .willThrow(new NotFoundException("invalidRefreshToken: Refresh token is not in database!"));

    // Exécute la requête POST et vérifie que la réponse est une erreur 404
    mockMvc.perform(post("/api/auth/refreshToken")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(requestDto)))
            .andExpect(status().isNotFound());
  }

  @Test
  public void refreshToken_WhenTokenIsExpired_ThrowsBadRequestException() throws Exception {
    // Mock les données de la requête RefreshTokenRequestDto
    RefreshTokenRequestDto requestDto = new RefreshTokenRequestDto();
    requestDto.setRefreshToken("expiredRefreshToken");

    // Simule une exception BadRequestException pour un jeton expiré
    given(authService.refreshAccessToken(requestDto.getRefreshToken()))
            .willThrow(new BadRequestException("Refresh token is expired"));

    // Exécute la requête POST et vérifie que la réponse est une erreur 400
    mockMvc.perform(post("/api/auth/refreshToken")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(requestDto)))
            .andExpect(status().isBadRequest());
  }
}
