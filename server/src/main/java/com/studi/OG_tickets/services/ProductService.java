package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.mappers.ProductMapper;
import com.studi.OG_tickets.models.Product;
import com.studi.OG_tickets.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {

  private ProductRepository productRepository;

  @Transactional
  public ProductDto createProduct(ProductDto productDto) {
    Product product = ProductMapper.toEntity(productDto);
    product.setCur(UUID.randomUUID());

    Product newProduct = productRepository.save(product);
    return ProductMapper.toDto(newProduct);
  }

  @Transactional
  public ProductDto updateProduct(Long id, ProductDto productDto) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));

    product.updateFromDto(productDto);
    Product updatedProduct = productRepository.save(product);
    return ProductMapper.toDto(updatedProduct);

  }

  @Transactional
  public void deleteProduct(Long id) {
    if (!productRepository.existsById(id)) {
      throw new NotFoundException("Product not found with id: " + id);
    }
    productRepository.deleteById(id);
  }

  public ProductDto getById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));
    return ProductMapper.toDto(product);
  }

  public List<ProductDto> getAllProducts() {
    List<Product> products = productRepository.findAll();
    if (products.isEmpty()) {
      throw new NotFoundException("No products found");
    }
    return products.stream().map(ProductMapper::toDto).collect(Collectors.toList());
  }

}
