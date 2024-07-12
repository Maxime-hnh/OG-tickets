package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.exceptions.InternalServerException;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.mappers.ProductMapper;
import com.studi.OG_tickets.models.Product;
import com.studi.OG_tickets.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {

  private ProductRepository productRepository;

  @Async
  public CompletableFuture<ProductDto> createProduct(ProductDto productDto) {
    return CompletableFuture.supplyAsync(() -> {
      Product product = ProductMapper.toEntity(productDto);
      Product newProduct = productRepository.save(product);
      return ProductMapper.toDto(newProduct);
    });
  }

  @Async
  public CompletableFuture<ProductDto> getById(Long id) {
    return CompletableFuture.supplyAsync(() -> {
      Product product = productRepository.findById(id)
              .orElseThrow(() -> new NotFoundException("No product found with id: " + id));
      return ProductMapper.toDto(product);
    });
  }

  @Async
  public CompletableFuture<List<ProductDto>> getAllProducts() {
    return CompletableFuture.supplyAsync(() -> {
      List<Product> products = productRepository.findAll();
      if (products.isEmpty()) {
        throw new NotFoundException("No products found");
      } else {
        return products.stream().map(ProductMapper::toDto).collect(Collectors.toList());
      }
    });
  }

  @Async
  public CompletableFuture<ProductDto> updateProduct(Long id, ProductDto productDto) {
    return CompletableFuture.supplyAsync(() -> productRepository.findById(id)
            .map(p -> {
              p.setName(productDto.getName());
              p.setDescription(productDto.getDescription());
              p.setPrice(productDto.getPrice());
              productRepository.save(p);
              return ProductMapper.toDto(p);
            }).orElseThrow(() -> new NotFoundException("Product with id " + id + " not found"))
    );
  }

  @Async
  public CompletableFuture<Void> deleteProduct(Long id) {
    return CompletableFuture.runAsync(() -> {
      if (productRepository.existsById(id)) {
        productRepository.deleteById(id);
      } else {
        throw new NotFoundException("Product with id " + id + " not found");
      }
    });
  }
}
