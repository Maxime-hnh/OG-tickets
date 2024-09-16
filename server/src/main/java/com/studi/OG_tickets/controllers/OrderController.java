package com.studi.OG_tickets.controllers;


import com.google.zxing.WriterException;
import com.studi.OG_tickets.dto.CreatedOrderResponseDto;
import com.studi.OG_tickets.dto.OrderDto;
import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.exceptions.InternalServerException;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.OrderRepository;
import com.studi.OG_tickets.repository.UserRepository;
import com.studi.OG_tickets.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/order")
@AllArgsConstructor
public class OrderController {

  private final OrderService orderService;
  private final UserRepository userRepository;
  private final OrderRepository orderRepository;

  @PostMapping("/create/user/{userId}")
  public ResponseEntity<CreatedOrderResponseDto> createOrder(@PathVariable Long userId, @RequestBody OrderDto orderDto) {
    try {
      UserEntity user = userRepository.findById(userId)
              .orElseThrow(() -> new NotFoundException("User not found"));
      CreatedOrderResponseDto newOrder = orderService.createOrder(orderDto, user);

      return ResponseEntity.ok().body(newOrder);
    } catch (InternalServerException | IOException | WriterException e) {
      throw new InternalServerException(e.getMessage(), e.getCause());
    }
  }

  @PutMapping("/validate/{orderId}/user/{userId}")
  public ResponseEntity<CreatedOrderResponseDto> validateOrder(@PathVariable Long orderId, @PathVariable Long userId) {
    try {
      UserEntity user = userRepository.findById(userId)
              .orElseThrow(() -> new NotFoundException("User not found"));
      Order order = orderRepository.findById(orderId)
              .orElseThrow(() -> new NotFoundException("Order not found"));
      CreatedOrderResponseDto validatedOrder = orderService.validateOrder(order, user);
      return ResponseEntity.ok().body(validatedOrder);
    } catch (InternalServerException | IOException | WriterException e) {
      throw new InternalServerException(e.getMessage(), e.getCause());
    }
  }

  @GetMapping("/qrcode/{orderId}")
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

  @GetMapping("/{id}")
  public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
    try {
      OrderDto orderDto = orderService.getById(id);
      return ResponseEntity.ok(orderDto);
    } catch (NotFoundException e) {
      throw new NotFoundException(e.getMessage());
    }
  }

  @GetMapping("/all")
  public ResponseEntity<List<OrderDto>> getAllProducts() {
    try {
      List<OrderDto> ordersDto = orderService.getAllOrders();
      return ResponseEntity.ok(ordersDto);
    } catch (NotFoundException e) {
      throw new NotFoundException(e.getMessage());
    }
  }
}
