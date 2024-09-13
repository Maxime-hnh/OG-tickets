package com.studi.OG_tickets.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studi.OG_tickets.dto.ProductFromOrderDto;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.List;

@Converter
public class ProductsConverter implements AttributeConverter<List<ProductFromOrderDto>, String> {

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(List<ProductFromOrderDto> products) {
    try {
      return objectMapper.writeValueAsString(products);
    } catch (JsonProcessingException e) {
      throw new IllegalArgumentException("Erreur lors de la conversion de la liste en JSON", e);
    }
  }

  @Override
  public List<ProductFromOrderDto> convertToEntityAttribute(String productsJson) {
    try {
      return objectMapper.readValue(productsJson, new TypeReference<List<ProductFromOrderDto>>() {});
    } catch (IOException e) {
      throw new IllegalArgumentException("Erreur lors de la conversion du JSON en liste", e);
    }
  }
}
