package com.studi.OG_tickets.controllers;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/product/")
@AllArgsConstructor
public class ProductController {

  private final ProductService productService;

  @PostMapping("/")
  public CompletableFuture<ResponseEntity<ProductDto>> createProduct(@RequestBody ProductDto productDto) {
    return productService.createProduct(productDto)
            .thenApply(ResponseEntity::ok);
  }

  @GetMapping("/{id}")
  public CompletableFuture<ResponseEntity<ProductDto>> getProduct(@PathVariable Long id) {
    return productService.getById(id)
            .thenApply(ResponseEntity::ok);
  }

  @GetMapping("all")
  public CompletableFuture<ResponseEntity<List<ProductDto>>> getAllProducts() {
    return productService.getAllProducts()
            .thenApply(ResponseEntity::ok);
  }

  @PutMapping("/{id}")
  public CompletableFuture<ResponseEntity<ProductDto>> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
    return productService.updateProduct(id, productDto)
            .thenApply(ResponseEntity::ok);
  }

  @DeleteMapping("/{id}")
  public CompletableFuture<ResponseEntity<Void>> deleteProduct(@PathVariable Long id) {
    return productService.deleteProduct(id)
            .thenApply(ResponseEntity::ok);
  }
}
