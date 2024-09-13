package com.studi.OG_tickets.services;

import com.google.zxing.WriterException;
import com.studi.OG_tickets.dto.OrderDto;
import com.studi.OG_tickets.dto.ProductFromOrderDto;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.mappers.OrderMapper;
import com.studi.OG_tickets.models.Order;
import com.studi.OG_tickets.models.Product;
import com.studi.OG_tickets.models.UserEntity;
import com.studi.OG_tickets.repository.OrderRepository;
import com.studi.OG_tickets.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {

  private OrderRepository orderRepository;
  private ProductRepository productRepository;
  private QrCodeService qrCodeService;

  @Transactional
  public OrderDto createOrder(OrderDto orderDto, UserEntity user) throws IOException, WriterException {
    List<ProductFromOrderDto> productsFromOrderDto = orderDto.getProducts();
    List<Long> productIds = productsFromOrderDto.stream()
            .map(ProductFromOrderDto::getId)
            .toList();

    List<Product> products = productRepository.findAllById(productIds);
    if (products.size() != productsFromOrderDto.size()) {
      throw new IllegalArgumentException("Certains produits n'ont pas été trouvés dans la base de données.");
    }
    for (ProductFromOrderDto productFromOrderDto : productsFromOrderDto) {
      Product matchingProduct = products.stream()
              .filter(product -> product.getId().equals(productFromOrderDto.getId()))
              .findFirst()
              .orElseThrow(() -> new IllegalArgumentException("Produit non trouvé : " + productFromOrderDto.getId()));

      if (matchingProduct.getPrice().compareTo(productFromOrderDto.getPrice()) != 0) {
        throw new IllegalArgumentException("Le prix du produit " + productFromOrderDto.getId() + " ne correspond pas.");
      }
    }
    BigDecimal totalCalculated = products.stream()
            .map(Product::getPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

    if (totalCalculated.compareTo(orderDto.getAmount()) != 0) {
      throw new IllegalArgumentException("Le montant total de la commande ne correspond pas à la somme des produits.");
    }

    Order order = OrderMapper.toEntity(orderDto);
    // add userId to order
    order.setUser(user);

    order.setCur(UUID.randomUUID());
    order.setStatus("DRAFT");

    //create order key
    UUID orderKey = UUID.randomUUID();
    order.setKey(orderKey);

    //merge user key with order key
    String finalKey = user.getKey().toString() + orderKey;
    order.setFinalKey(finalKey);

    //create QR code content and add it to order
    String qrCodeContent = qrCodeService.generateQrCodeContent(user, finalKey);
    byte[] qrCode = qrCodeService.generateQRCode(qrCodeContent);
    order.setQrCode(qrCode);

    //save and return new order
    Order newOrder = orderRepository.save(order);
    return OrderMapper.toDto(newOrder);
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

}
