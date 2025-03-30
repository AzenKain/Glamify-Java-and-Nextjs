package com.example.api_ecommerce.controller;

import com.example.api_ecommerce.dto.request.ProductRequest;
import com.example.api_ecommerce.dto.response.ApiResponse;
import com.example.api_ecommerce.dto.response.UserResponse;
import com.example.api_ecommerce.entity.Product;
import com.example.api_ecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @GetMapping("/all")
    ApiResponse<List<Product>> getProduct() {
        ApiResponse<List<Product>> response = new ApiResponse<>();
        response.setResult(productService.getProduct());
        return response;
    }
    @GetMapping("/top")
    ApiResponse<List<Product>> getTopProducts(@RequestParam(defaultValue = "5") int quantity) {
        ApiResponse<List<Product>> response = new ApiResponse<>();
        response.setResult(productService.getTopProducts(quantity));
        return response;
    }

    @GetMapping("/id/{productId}")
    ApiResponse<Product> getProductById(
            @PathVariable("productId") String productId)
    {
        ApiResponse<Product> response = new ApiResponse<>();
        response.setResult(productService.getProductById(productId));
        return response;
    }

    @PostMapping("/create")
    ApiResponse<Product> createRole(@RequestBody @Valid ProductRequest request) {
        ApiResponse<Product> response = new ApiResponse<>();
        response.setResult(productService.createProduct(request));
        return response;
    }

    @PutMapping("/update/{productId}")
    ApiResponse<Product> updateProduct(
            @PathVariable("productId") String productId,
            @RequestBody ProductRequest request
    ) {
        ApiResponse<Product> response = new ApiResponse<>();
        response.setResult(productService.updateProduct(productId, request));
        return response;
    }

    @DeleteMapping("delete/{productId}")
    ApiResponse deleteProduct(
            @PathVariable("productId") String productId
    ) {
        productService.deleteProduct(productId);
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setMessage("Role has been deleted");
        return response;
    }
}
