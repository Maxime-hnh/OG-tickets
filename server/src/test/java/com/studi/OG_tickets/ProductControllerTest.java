package com.studi.OG_tickets;

import com.studi.OG_tickets.controllers.ProductController;
import com.studi.OG_tickets.dto.ProductDto;
import com.studi.OG_tickets.exceptions.NotFoundException;
import com.studi.OG_tickets.models.Product;
import com.studi.OG_tickets.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@ExtendWith(MockitoExtension.class)
public class ProductControllerTest {

  private MockMvc mockMvc;

  @Mock
  private ProductService productService;

  @InjectMocks
  private ProductController productController;

  @BeforeEach
  public void setup() {
    mockMvc = MockMvcBuilders.standaloneSetup(productController).build();
  }

  // ObjectMapper to convert objects to JSON
  private static final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  public void testCreateProduct_WhenSuccessful() throws Exception {
    ProductDto productDto = getProductDto(); //body
    ProductDto newProductDto = getProductDto(); //response

    // Assuming createProduct in the service layer returns a valid product DTO
    given(productService.createProduct(productDto)).willReturn(newProductDto);

    mockMvc.perform(post("/api/product/create")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(productDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(objectMapper.writeValueAsString(newProductDto)));
  }

  @Test
  public void testGetProductById_WhenSuccessful() throws Exception {
    ProductDto productDto = getProductDto();
    Long id = 1L;
    given(productService.getById(id)).willReturn(productDto);

    mockMvc.perform(get("/api/product/" + id)
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(productDto)));
  }

  @Test
  public void testGetProductById_WhenNotFound() throws Exception {
    Long id = 1L;
    doThrow(new NotFoundException("Product not found with id: " + id)).when(productService).getById(id);

    mockMvc.perform(get("/api/product/" + id))
            .andExpect(status().isNotFound());
  }


  @Test
  public void testGetAllProducts_WhenSuccessful() throws Exception {
    ProductDto product1 = getProductDto();
    ProductDto product2 = getProductDto();
    List<ProductDto> productList = Arrays.asList(product1, product2);
    given(productService.getAllProducts()).willReturn(productList);

    mockMvc.perform(get("/api/product/all")
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(productList)));
  }

  @Test
  public void getAllProducts_WhenNoProductsFound() throws Exception {
    given(productService.getAllProducts()).willThrow(new NotFoundException("No products found"));

    mockMvc.perform(get("/api/product/all")
                    .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
  }


  @Test
  public void updateProduct_WhenProductExists() throws Exception {
    Long id = 1L;
    ProductDto productDto = getProductDto();
    productDto.setName("Updated Name");

    given(productService.updateProduct(id, productDto)).willReturn(productDto);

    mockMvc.perform(put("/api/product/" + id)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(productDto)))
            .andExpect(status().isOk())
            .andExpect(content().json(new ObjectMapper().writeValueAsString(productDto)));
  }

  @Test
  public void updateProduct_WhenProductNotFound() throws Exception {
    Long id = 1L;
    ProductDto productDto = getProductDto();
    given(productService.updateProduct(id, productDto)).willThrow(new NotFoundException("Product not found with id: " + id));

    mockMvc.perform(put("/api/product/" + id)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(productDto)))
            .andExpect(status().isNotFound());
  }


  @Test
  public void deleteProduct_WhenSuccessful() throws Exception {
    Long id = 1L;
    doNothing().when(productService).deleteProduct(id);

    mockMvc.perform(delete("/api/product/" + id))
            .andExpect(status().isNoContent());
  }


  @Test
  public void deleteProduct_WhenNotFound() throws Exception {
    Long id = 1L;
    doThrow(new NotFoundException("Product not found with id: " + id)).when(productService).deleteProduct(id);

    mockMvc.perform(delete("/api/product/" + id))
            .andExpect(status().isNotFound());
  }

  private static ProductDto getProductDto() {
    ProductDto productDto = new ProductDto();
    productDto.setCur(UUID.randomUUID());
    productDto.setName("Surf");
    productDto.setImage("/pictograms/Surf.avif");
    productDto.setDescription("L'heure de briller");
    productDto.setPrice(BigDecimal.valueOf(10.99));
    productDto.setCity("Paris");
    productDto.setVenue("Stade de France");
    productDto.setStage("Quart de finale");
    productDto.setVisible(true);
    productDto.setCategory(Product.Category.FAMILIALE);
    productDto.setStock(1000);
    return productDto;
  }
}
