package com.studi.OG_tickets.services;

import com.google.zxing.WriterException;
import com.studi.OG_tickets.dto.CreatedOrderResponseDto;
import com.studi.OG_tickets.dto.OrderDto;
import com.studi.OG_tickets.dto.OrderWithUserDto;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.mappers.OrderMapper;
import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {

  private OrderRepository orderRepository;
  private ProductService productService;
  private QrCodeService qrCodeService;

  @Transactional
  public CreatedOrderResponseDto createOrder(OrderDto orderDto, UserEntity user) throws IOException, WriterException {
    productService.validateAndUpdateStock(orderDto.getProducts(), orderDto.getAmount());

    Order order = OrderMapper.toEntity(orderDto);
    // add userId to order
    order.setUser(user);

    order.setCur(UUID.randomUUID());
    order.setStatus("DRAFT");

    String invoiceValue = generateInvoiceNumber();
    order.setInvoice(invoiceValue);

    //create order key
    UUID orderKey = UUID.randomUUID();
    order.setKey(orderKey);

    //save and return new order
    Order newOrder = orderRepository.save(order);
    return OrderMapper.toResponseDto(newOrder);
  }

  @Transactional
  public CreatedOrderResponseDto validateOrder(Order order, UserEntity user) throws IOException, WriterException {
    order.setStatus("VALIDATED");

    //merge user key with order key
    String finalKey = user.getKey().toString() + order.getKey().toString();
    order.setFinalKey(finalKey);

    //create QR code content and add it to order
    String qrCodeContent = qrCodeService.generateQrCodeContent(user, finalKey);
    byte[] qrCode = qrCodeService.generateQRCode(qrCodeContent);
    order.setQrCode(qrCode);

    Order updatedOrder = orderRepository.save(order);
    return OrderMapper.toResponseDto(updatedOrder);
  }


  public OrderDto getById(Long id) {
    Order order = orderRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Order not found with id : " + id));
    return OrderMapper.toDto(order);
  }

  public List<OrderDto> getAllOrders() {
    List<Order> orders = orderRepository.findAll();
    if (orders.isEmpty()) {
      throw new NotFoundException("No orders found");
    }
    return orders.stream().map(OrderMapper::toDto).collect(Collectors.toList());
  }

  public List<OrderWithUserDto> getAllWithUserInfo() {
    List<Order> orders = orderRepository.findAllAndFetchUserEagerly();
    if (orders.isEmpty()) {
      throw new NotFoundException("No orders found");
    }
    return orders.stream().map(OrderMapper::toDtoWithUser).collect(Collectors.toList());
  }

  private String generateInvoiceNumber() {
    SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyy");
    String datePart = sdf.format(new Date());

    Random random = new Random();
    int randomNumber = 1000 + random.nextInt(9000);

    return "REF-" + datePart + "-" + randomNumber;
  }

}
