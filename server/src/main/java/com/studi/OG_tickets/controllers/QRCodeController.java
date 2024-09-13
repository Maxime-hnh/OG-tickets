package com.studi.OG_tickets.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studi.OG_tickets.dto.QrCodeContentDto;
import com.studi.OG_tickets.exceptions.BadRequestException;
import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.OrderRepository;
import com.studi.OG_tickets.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/qrcode")
public class QRCodeController {

  private final OrderRepository orderRepository;
  private final UserRepository userRepository;

  @PostMapping("/scan")
  public ResponseEntity<String> scanQRCode(@RequestBody String qrCodeContent) {

    try {
      ObjectMapper objectMapper = new ObjectMapper();
      QrCodeContentDto qrCodeData = objectMapper.readValue(qrCodeContent, QrCodeContentDto.class);

      Long userId = qrCodeData.getUserId();
      String finalKey = qrCodeData.getFinalKey();

      UserEntity user = userRepository.findById(userId)
              .orElseThrow(() -> new IllegalArgumentException("⛔ User with id " + userId + " not found"));

      Order order = orderRepository.findByUserAndFinalKey(user, finalKey)
              .orElseThrow(() -> new IllegalArgumentException("⛔ Order not found"));

      return ResponseEntity.ok(
              "✅ QR Code Ok. User : " + user.getFirstName() + " " + user.getLastName() +
              ", Date d'achat : " + order.getCreatedAt());

    } catch (Exception e) {
      throw new BadRequestException(e.getMessage());
    }
  }
}