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
    productDto.setActive(product.isActive());
    productDto.setStatus(product.getStatus());
    productDto.setCategory(product.getCategory());
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
    product.setActive(productDto.isActive());
    product.setStatus(productDto.getStatus());
    product.setCategory(productDto.getCategory());
    return product;
  }
}
