package com.studi.OG_tickets.mappers;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.models.Product;

public class ProductMapper {

  public static ProductDto toDto(Product product) {
    ProductDto productDto = new ProductDto();
    productDto.setId(product.getId());
    productDto.setCur(product.getCur()) ;
    productDto.setName(product.getName());
    productDto.setDescription(product.getDescription());
    productDto.setImage(product.getImage());
    productDto.setPrice(product.getPrice());
    productDto.setStock(product.getStock());
    productDto.setCity(product.getCity());
    productDto.setVenue(product.getVenue());
    productDto.setStage(product.getStage());
    productDto.setVisible(product.getVisible());
    productDto.setDate(product.getDate());
    productDto.setStartTime(product.getStartTime());
    productDto.setEndTime(product.getEndTime());
    productDto.setCategory(product.getCategory());
    productDto.setQuantitySold(product.getQuantitySold());
    return productDto;
  }

  public static Product toEntity(ProductDto productDto) {
    Product product = new Product();
    product.setId(productDto.getId());
    product.setCur(productDto.getCur());
    product.setName(productDto.getName());
    product.setDescription(productDto.getDescription());
    product.setImage(productDto.getImage());
    product.setPrice(productDto.getPrice());
    product.setStock(productDto.getStock());
    product.setCity(productDto.getCity());
    product.setVenue(productDto.getVenue());
    product.setStage(productDto.getStage());
    product.setVisible(productDto.getVisible());
    product.setDate(productDto.getDate());
    product.setStartTime(productDto.getStartTime());
    product.setEndTime(productDto.getEndTime());
    product.setCategory(productDto.getCategory());
    product.setQuantitySold(productDto.getQuantitySold());
    return product;
  }
}
