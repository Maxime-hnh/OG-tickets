package com.studi.OG_tickets;

import com.studi.OG_tickets.controllers.OrderController;
import com.studi.OG_tickets.dto.CreatedOrderResponseDto;
import com.studi.OG_tickets.dto.OrderDto;
import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.OrderRepository;
import com.studi.OG_tickets.repository.UserRepository;
import com.studi.OG_tickets.services.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;


@ExtendWith(MockitoExtension.class)
public class OrderControllerTest {

  private MockMvc mockMvc;

  @Mock
  private UserRepository userRepository;

  @Mock
  private OrderRepository orderRepository;

  @Mock
  private OrderService orderService;

  @InjectMocks
  private OrderController orderController;

  @BeforeEach
  public void setup() {
    mockMvc = MockMvcBuilders.standaloneSetup(orderController).build();
  }

  @Test
  public void createOrder_WhenSuccess_ReturnsCreatedOrder() throws Exception {
    // Mock les données de l'utilisateur et de la commande
    Long userId = 1L;
    UserEntity user = new UserEntity();
    user.setId(userId);
    user.setEmail("john.doe@example.com");

    OrderDto orderDto = new OrderDto();
    orderDto.setAmount(BigDecimal.valueOf(100.0));

    CreatedOrderResponseDto createdOrder = new CreatedOrderResponseDto();
    createdOrder.setId(1L);
    createdOrder.setStatus("DRAFT");

    // Simule le comportement du dépôt utilisateur et du service de commande
    given(userRepository.findById(userId)).willReturn(Optional.of(user));
    given(orderService.createOrder(any(OrderDto.class), any(UserEntity.class))).willReturn(createdOrder);

    // Exécute la requête POST et vérifie les résultats
    mockMvc.perform(post("/api/order/create/user/{userId}", userId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(orderDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(createdOrder)));
  }

  @Test
  public void createOrder_WhenUserNotFound_ThrowsNotFoundException() throws Exception {
    // Mock les données de l'utilisateur introuvable
    Long userId = 1L;
    OrderDto orderDto = new OrderDto();
    orderDto.setAmount(BigDecimal.valueOf(100.0));

    // Simule une exception NotFoundException lorsque l'utilisateur est introuvable
    given(userRepository.findById(userId)).willReturn(Optional.empty());

    // Exécute la requête POST et vérifie que la réponse est une erreur 404
    mockMvc.perform(post("/api/order/create/user/{userId}", userId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(orderDto)))
            .andExpect(status().isNotFound());
  }

  @Test
  public void validateOrder_WhenSuccess_ReturnsValidatedOrder() throws Exception {
    // Mock les données de l'utilisateur et de la commande
    Long userId = 1L;
    Long orderId = 100L;
    UserEntity user = new UserEntity();
    user.setId(userId);
    user.setKey(UUID.randomUUID());

    Order order = new Order();
    order.setId(orderId);
    order.setKey(UUID.randomUUID());

    CreatedOrderResponseDto validatedOrder = new CreatedOrderResponseDto();
    validatedOrder.setId(orderId);
    validatedOrder.setStatus("VALIDATED");

    // Simule le comportement des repositories et du service
    given(userRepository.findById(userId)).willReturn(Optional.of(user));
    given(orderRepository.findById(orderId)).willReturn(Optional.of(order));
    given(orderService.validateOrder(any(Order.class), any(UserEntity.class))).willReturn(validatedOrder);

    // Exécute la requête PUT et vérifie les résultats
    mockMvc.perform(put("/api/order/validate/{orderId}/user/{userId}", orderId, userId)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(validatedOrder)));
  }

  @Test
  public void validateOrder_WhenUserNotFound_ThrowsNotFoundException() throws Exception {
    // Mock les données de l'utilisateur introuvable
    Long userId = 1L;
    Long orderId = 100L;

    // Simule une exception NotFoundException pour l'utilisateur introuvable
    given(userRepository.findById(userId)).willReturn(Optional.empty());

    // Exécute la requête PUT et vérifie que la réponse est une erreur 404
    mockMvc.perform(put("/api/order/validate/{orderId}/user/{userId}", orderId, userId)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
  }

  @Test
  public void validateOrder_WhenOrderNotFound_ThrowsNotFoundException() throws Exception {
    // Mock les données de l'utilisateur et de la commande introuvable
    Long userId = 1L;
    Long orderId = 100L;
    UserEntity user = new UserEntity();
    user.setId(userId);

    // Simule une exception NotFoundException pour la commande introuvable
    given(userRepository.findById(userId)).willReturn(Optional.of(user));
    given(orderRepository.findById(orderId)).willReturn(Optional.empty());

    // Exécute la requête PUT et vérifie que la réponse est une erreur 404
    mockMvc.perform(put("/api/order/validate/{orderId}/user/{userId}", orderId, userId)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
  }
}