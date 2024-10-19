package com.studi.OG_tickets;

import static org.mockito.BDDMockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.studi.OG_tickets.dto.ProductFromOrderDto;
import com.studi.OG_tickets.models.Product;
import com.studi.OG_tickets.repository.ProductRepository;
import com.studi.OG_tickets.services.ProductService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {


  @Mock
  private ProductRepository productRepository;

  @InjectMocks
  private ProductService productService;

  @Test
  public void validateAndUpdateStock_WhenAllProductsValid_Success() {
    List<ProductFromOrderDto> productsFromOrderDto = Arrays.asList(
            getProductDto(1L, 10, 2),
            getProductDto(2L, 20, 1)
    );

    Product product1 = getProduct(1L, "Product 1", 10, 100);
    Product product2 = getProduct(2L, "Product 2", 20, 100);

    List<Product> products = Arrays.asList(product1, product2);

    // Simuler la récupération des produits dans la base de données
    given(productRepository.findAllById(anyList())).willReturn(products);

    // Appel du service
    productService.validateAndUpdateStock(productsFromOrderDto, BigDecimal.valueOf(40.00));

    // Vérification que les stocks ont bien été mis à jour
    assertEquals(98, product1.getStock());
    assertEquals(99, product2.getStock());

    // Vérification que la méthode saveAll a bien été appelée
    verify(productRepository).saveAll(products);
  }

  @Test
  public void validateAndUpdateStock_WhenProductNotFound_ThrowsException() {
    List<ProductFromOrderDto> productsFromOrderDto = Arrays.asList(
            getProductDto(1L, 10, 2),
            getProductDto(2L, (int) 20.99, 1)
    );

    Product product1 = getProduct(1L, "Product 1", 10, 100);

    // Simuler qu'un des produits n'est pas trouvé dans la base de données
    given(productRepository.findAllById(anyList())).willReturn(List.of(product1));

    // Vérification que l'exception est levée
    Exception exception = assertThrows(IllegalArgumentException.class, () ->
            productService.validateAndUpdateStock(productsFromOrderDto, BigDecimal.valueOf(40.00)));

    assertEquals("Certains produits n'ont pas été trouvés dans la base de données.", exception.getMessage());
  }

  @Test
  public void validateAndUpdateStock_WhenPriceMismatch_ThrowsException() {
    List<ProductFromOrderDto> productsFromOrderDto = Arrays.asList(
            getProductDto(1L, 10, 2),
            getProductDto(2L, 20, 1)

    );

    Product product1 = getProduct(1L, "Product 1", 11, 10);
    Product product2 = getProduct(2L, "Product 2", 20, 10);


    given(productRepository.findAllById(anyList())).willReturn(Arrays.asList(product1, product2));

    Exception exception = assertThrows(IllegalArgumentException.class, () ->
            productService.validateAndUpdateStock(productsFromOrderDto, BigDecimal.valueOf(40.00)));

    assertEquals("Le prix du produit 1 ne correspond pas.", exception.getMessage());
  }

  @Test
  public void validateAndUpdateStock_WhenStockInsufficient_ThrowsException() {
    List<ProductFromOrderDto> productsFromOrderDto = List.of(
            getProductDto(1L, 10, 2)  // Quantité trop élevée
    );

    Product product1 = getProduct(1L, "Product 1", 10, 1);

    given(productRepository.findAllById(anyList())).willReturn(List.of(product1));

    Exception exception = assertThrows(IllegalArgumentException.class, () ->
            productService.validateAndUpdateStock(productsFromOrderDto, BigDecimal.valueOf(20.00)));
    assertEquals("Stock insuffisant pour le produit : Product 1", exception.getMessage());
  }

  @Test
  public void validateAndUpdateStock_WhenTotalAmountMismatch_ThrowsException() {
    List<ProductFromOrderDto> productsFromOrderDto = Arrays.asList(
            getProductDto(1L, 10, 2),
            getProductDto(2L, 20, 1)
    );

    Product product1 = getProduct(1L, "Product 1", 10, 10);
    Product product2 = getProduct(2L, "Product 2", 20, 10);

    List<Product> products = Arrays.asList(product1, product2);

    given(productRepository.findAllById(anyList())).willReturn(products);

    Exception exception = assertThrows(IllegalArgumentException.class, () -> {
      // Le montant total ici ne correspond pas au calcul attendu
      productService.validateAndUpdateStock(productsFromOrderDto, BigDecimal.valueOf(52.99));
    });

    assertEquals("Le montant total de la commande ne correspond pas à la somme des produits.", exception.getMessage());
  }

  private static ProductFromOrderDto getProductDto(Long id, int price, int quantity) {
    ProductFromOrderDto productDto = new ProductFromOrderDto();
    productDto.setId(id);
    productDto.setPrice(BigDecimal.valueOf(price));
    productDto.setQuantity(quantity);
    return productDto;
  }

  private static Product getProduct(Long id, String name, int price, int stock) {
    Product product = new Product();
    product.setId(id);
    product.setName(name);
    product.setPrice(BigDecimal.valueOf(price));
    product.setStock(stock);
    product.setQuantitySold(0);
    return product;
  }
}
