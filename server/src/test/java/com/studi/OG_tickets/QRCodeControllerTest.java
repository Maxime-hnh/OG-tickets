package com.studi.OG_tickets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studi.OG_tickets.controllers.QRCodeController;
import com.studi.OG_tickets.dto.QrCodeContentDto;
import com.studi.OG_tickets.exceptions.GlobalExceptionHandler;
import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.OrderRepository;
import com.studi.OG_tickets.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)

public class QRCodeControllerTest {

  private MockMvc mockMvc;

  @Mock
  private OrderRepository orderRepository;

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private QRCodeController qrCodeController;

  @BeforeEach
  public void setup() {
    mockMvc = MockMvcBuilders.standaloneSetup(qrCodeController)
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
  }

  private static final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  public void scanQRCode_WhenValidQRCode_ReturnsSuccess() throws Exception {

    QrCodeContentDto qrCodeData = new QrCodeContentDto();
    qrCodeData.setUserId(1L);
    qrCodeData.setFinalKey("VALID_FINAL_KEY");

    UserEntity user = new UserEntity();
    user.setId(1L);
    user.setFirstName("John");
    user.setLastName("Doe");

    LocalDateTime date = LocalDateTime.now();
    Order order = new Order();
    order.setFinalKey("VALID_FINAL_KEY");
    order.setCreatedAt(date);


    given(userRepository.findById(1L)).willReturn(Optional.of(user));
    given(orderRepository.findByUserAndFinalKey(user, "VALID_FINAL_KEY")).willReturn(Optional.of(order));

    // Effectue la requête POST avec le contenu du QR code
    mockMvc.perform(post("/api/qrcode/scan")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(qrCodeData)))
            .andExpect(status().isOk())
            .andExpect(content().string("Client : John Doe, Date d'achat : " + date));
  }

  @Test
  public void scanQRCode_WhenUserNotFound_ReturnsBadRequest() throws Exception {
    QrCodeContentDto qrCodeData = new QrCodeContentDto();
    qrCodeData.setUserId(1L);
    qrCodeData.setFinalKey("INVALID_FINAL_KEY");

    // Simule un utilisateur non trouvé
    given(userRepository.findById(1L)).willReturn(Optional.empty());

    mockMvc.perform(post("/api/qrcode/scan")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(qrCodeData)))
            .andExpect(status().isBadRequest());
  }

  @Test
  public void scanQRCode_WhenOrderNotFound_ReturnsBadRequest() throws Exception {
    QrCodeContentDto qrCodeData = new QrCodeContentDto();
    qrCodeData.setUserId(1L);
    qrCodeData.setFinalKey("INVALID_FINAL_KEY");

    // Simule un utilisateur valide mais une commande non trouvée
    UserEntity user = new UserEntity();
    user.setId(1L);
    user.setFirstName("John");
    user.setLastName("Doe");

    given(userRepository.findById(1L)).willReturn(Optional.of(user));
    given(orderRepository.findByUserAndFinalKey(user, "INVALID_FINAL_KEY")).willReturn(Optional.empty());

    mockMvc.perform(post("/api/qrcode/scan")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(qrCodeData)))
            .andExpect(status().isBadRequest());
  }

}