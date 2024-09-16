package com.studi.OG_tickets.services;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.dto.ProductFromOrderDto;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.mappers.ProductMapper;
import com.studi.OG_tickets.models.Product;
import com.studi.OG_tickets.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

  public void validateAndUpdateStock(List<ProductFromOrderDto> productsFromOrderDto, BigDecimal totalAmount) {
    List<Long> productIds = productsFromOrderDto.stream()
            .map(ProductFromOrderDto::getId)
            .toList();

    List<Product> products = productRepository.findAllById(productIds);

    if (products.size() != productsFromOrderDto.size()) {
      throw new IllegalArgumentException("Certains produits n'ont pas été trouvés dans la base de données.");
    }

    BigDecimal totalCalculated = productsFromOrderDto.stream()
            .map(productFromOrderDto -> {
              Product matchingProduct = products.stream()
                      .filter(product -> product.getId().equals(productFromOrderDto.getId()))
                      .findFirst()
                      .orElseThrow(() -> new IllegalArgumentException("Produit non trouvé : " + productFromOrderDto.getId()));

              // Check if prices are the same
              if (matchingProduct.getPrice().compareTo(productFromOrderDto.getPrice()) != 0) {
                throw new IllegalArgumentException("Le prix du produit " + productFromOrderDto.getId() + " ne correspond pas.");
              }

              // Check if there is enough stock
              if (matchingProduct.getStock() < productFromOrderDto.getQuantity()) {
                throw new IllegalArgumentException("Stock insuffisant pour le produit : " + matchingProduct.getName());
              }

              // Reduce stock and add quantity
              matchingProduct.setStock(matchingProduct.getStock() - productFromOrderDto.getQuantity());
              matchingProduct.setQuantitySold(
                      (matchingProduct.getQuantitySold() != null ? matchingProduct.getQuantitySold() : 0)
                              + productFromOrderDto.getQuantity()
              );

              // return total amount for this product (price * quantity)
              return matchingProduct.getPrice().multiply(BigDecimal.valueOf(productFromOrderDto.getQuantity()));
            })
            .reduce(BigDecimal.ZERO, BigDecimal::add);  //Cumulate amounts
    totalCalculated = totalCalculated.setScale(2, RoundingMode.HALF_UP);

    // Compare totalCalculated to totalAmount
    if (totalCalculated.compareTo(totalAmount) != 0) {
      throw new IllegalArgumentException("Le montant total de la commande ne correspond pas à la somme des produits.");
    }
    productRepository.saveAll(products);
  }

}
