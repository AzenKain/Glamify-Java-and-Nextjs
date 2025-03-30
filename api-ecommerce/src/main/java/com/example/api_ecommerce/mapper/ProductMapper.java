package com.example.api_ecommerce.mapper;

import com.example.api_ecommerce.dto.request.ProductRequest;
import com.example.api_ecommerce.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductRequest dto);
    @Mapping(target = "imgDisplay", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductRequest dto);
}
