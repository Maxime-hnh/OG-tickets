package com.studi.OG_tickets.mappers;

import com.studi.OG_tickets.dto.CreatedOrderResponseDto;
import com.studi.OG_tickets.dto.OrderDto;
import com.studi.OG_tickets.dto.OrderWithUserDto;
import com.studi.OG_tickets.dto.UserShortDto;
import com.studi.OG_tickets.models.Order;

public class OrderMapper {

  public static OrderDto toDto(Order order) {
    OrderDto orderDto = new OrderDto();
    orderDto.setId(order.getId());
    orderDto.setCur(order.getCur());
    orderDto.setAmount(order.getAmount());
    orderDto.setStatus(order.getStatus());
    orderDto.setInvoice(order.getInvoice());
    orderDto.setKey(order.getKey());
    orderDto.setFinalKey(order.getFinalKey());
    orderDto.setQrCode(order.getQrCode());
    orderDto.setProducts(order.getProducts());
    orderDto.setUserId(order.getUser().getId());
    return orderDto;
  }

  public static OrderWithUserDto toDtoWithUser(Order order) {
    OrderWithUserDto orderWithUserDto = new OrderWithUserDto();
    orderWithUserDto.setId(order.getId());
    orderWithUserDto.setCur(order.getCur());
    orderWithUserDto.setAmount(order.getAmount());
    orderWithUserDto.setStatus(order.getStatus());
    orderWithUserDto.setInvoice(order.getInvoice());
    orderWithUserDto.setKey(order.getKey());
    orderWithUserDto.setFinalKey(order.getFinalKey());
    orderWithUserDto.setQrCode(order.getQrCode());
    orderWithUserDto.setProducts(order.getProducts());
    if (order.getUser() != null) {
      UserShortDto userShortDto = new UserShortDto();
      userShortDto.setId(order.getUser().getId());
      userShortDto.setFirstName(order.getUser().getFirstName());
      userShortDto.setLastName(order.getUser().getLastName());
      userShortDto.setEmail(order.getUser().getEmail());
      orderWithUserDto.setUser(userShortDto);
    }
    return orderWithUserDto;
  }

  public static Order toEntity(OrderDto orderDto) {
    Order order = new Order();
    order.setId(orderDto.getId());
    order.setCur(orderDto.getCur());
    order.setAmount(orderDto.getAmount());
    order.setStatus(orderDto.getStatus());
    order.setInvoice(orderDto.getInvoice());
    order.setKey(orderDto.getKey());
    order.setFinalKey(orderDto.getFinalKey());
    order.setQrCode(orderDto.getQrCode());
    order.setProducts(orderDto.getProducts());
    return order;
  }

  public static CreatedOrderResponseDto toResponseDto(Order order) {
    CreatedOrderResponseDto responseDto = new CreatedOrderResponseDto();
    responseDto.setId(order.getId());
    responseDto.setCur(order.getCur());
    responseDto.setAmount(order.getAmount());
    responseDto.setStatus(order.getStatus());
    responseDto.setInvoice(order.getInvoice());
    responseDto.setProducts(order.getProducts());
    responseDto.setUserId(order.getUser().getId());
    return responseDto;
  }
}

