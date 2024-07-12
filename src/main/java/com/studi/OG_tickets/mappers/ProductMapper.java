package com.studi.OG_tickets.mappers;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.models.Product;

public class ProductMapper {

  public static ProductDto toDto(Product product) {
    ProductDto productDto = new ProductDto();
    productDto.setId(product.getId());
    productDto.setName(product.getName());
    productDto.setDescription(product.getDescription());
    productDto.setPrice(product.getPrice());
    productDto.setStock(product.getStock());
    productDto.setCategory(product.getCategory());
    productDto.setImage(product.getImage());
    productDto.setActive(product.isActive());
    return productDto;
  }

  public static Product toEntity(ProductDto productDto) {
    Product product = new Product();
    product.setId(productDto.getId());
    product.setName(productDto.getName());
    product.setDescription(productDto.getDescription());
    product.setPrice(productDto.getPrice());
    product.setStock(productDto.getStock());
    product.setCategory(productDto.getCategory());
    product.setImage(productDto.getImage());
    product.setActive(productDto.isActive());
    return product;
  }
}
