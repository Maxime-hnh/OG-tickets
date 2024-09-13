package com.studi.OG_tickets.controllers;


import com.google.zxing.WriterException;
import com.studi.OG_tickets.dto.OrderDto;
import com.studi.OG_tickets.exceptions.InternalServerException;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.UserRepository;
import com.studi.OG_tickets.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/order")
@AllArgsConstructor
public class OrderController {

  private final OrderService orderService;
  private final UserRepository userRepository;

  @PostMapping("/create/user/{userId}")
  public ResponseEntity<OrderDto> createOrder(@PathVariable Long userId, @RequestBody OrderDto orderDto) {
    try {
      UserEntity user = userRepository.findById(userId)
              .orElseThrow(() -> new NotFoundException("User not found"));
      OrderDto newOrder = orderService.createOrder(orderDto, user);

      return ResponseEntity.ok().body(newOrder);
    } catch (InternalServerException | IOException | WriterException e) {
      throw new InternalServerException(e.getMessage(), e.getCause());
    }
  }

  @GetMapping("/{orderId}/qrcode")
  public ResponseEntity<byte[]> getOrderQrCode(@PathVariable Long orderId) {
    try {
      OrderDto orderDto = orderService.getById(orderId);
      byte[] qrCode = orderDto.getQrCode();

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.IMAGE_PNG);

      return new ResponseEntity<>(qrCode, headers, HttpStatus.OK);
    } catch (InternalServerException e) {
      throw new InternalServerException(e.getMessage(), e.getCause());
    }
  }
}
