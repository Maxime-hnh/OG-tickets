package com.studi.OG_tickets.controllers;

import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.exceptions.InternalServerException;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@AllArgsConstructor
public class ProductController {

  private final ProductService productService;

  @PostMapping("/create")
  public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
    try {
      ProductDto newProduct = productService.createProduct(productDto);
      return ResponseEntity.ok().body(newProduct);
    } catch (InternalServerException e) {
      throw new InternalServerException(e.getMessage(), e.getCause());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
    try {
      ProductDto updatedProduct = productService.updateProduct(id, productDto);
      return ResponseEntity.ok(updatedProduct);
    } catch (NotFoundException e) {
      throw new NotFoundException(e.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    try {
      productService.deleteProduct(id);
      return ResponseEntity.noContent().build();
    } catch (NotFoundException e) {
      throw new NotFoundException(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
    try {
      ProductDto productDto = productService.getById(id);
      return ResponseEntity.ok(productDto);
    } catch (NotFoundException e) {
      throw new NotFoundException(e.getMessage());
    }
  }

  @GetMapping("/all")
  public ResponseEntity<List<ProductDto>> getAllProducts() {
    try {
      List<ProductDto> productDto = productService.getAllProducts();
      return ResponseEntity.ok(productDto);
    } catch (NotFoundException e) {
      throw new NotFoundException(e.getMessage());
    }
  }
}
