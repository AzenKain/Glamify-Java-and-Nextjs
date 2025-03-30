package com.example.api_ecommerce.mapper;

import com.example.api_ecommerce.dto.request.OrderDetailRequest;
import com.example.api_ecommerce.entity.OrderDetail;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
    OrderDetail toOrderDetail(OrderDetailRequest dto);
    List<OrderDetail> toOrderDetail(List<OrderDetailRequest> dto);
}
