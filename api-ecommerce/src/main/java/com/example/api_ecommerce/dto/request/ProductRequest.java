package com.example.api_ecommerce.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductRequest {
    String productName;
    Double price;
    Double cost;
    Integer stockQuantity;
    String productType;
    List<String> color;
    List<String> size;
    List<String> tags;
    String company;
    List<String> materials;
    List<ProductImageRequest> imgDisplay;
    String description;
}

