package com.example.api_ecommerce.mapper;

import com.example.api_ecommerce.dto.request.ProductImageRequest;
import com.example.api_ecommerce.entity.ProductImage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    ProductImage toProductImage(ProductImageRequest dto);
    List<ProductImage> toListProductImage(List<ProductImageRequest> dto);
}
