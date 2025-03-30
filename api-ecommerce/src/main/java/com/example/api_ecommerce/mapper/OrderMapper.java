package com.example.api_ecommerce.mapper;

import com.example.api_ecommerce.dto.request.OrderCreateRequest;
import com.example.api_ecommerce.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toOrder(OrderCreateRequest dto);
    @Mapping(target = "listProducts", ignore = true)
    void updateOrder(@MappingTarget Order product, OrderCreateRequest dto);
}
