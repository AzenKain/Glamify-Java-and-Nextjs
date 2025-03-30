package com.example.api_ecommerce.service;

import com.example.api_ecommerce.dto.request.OrderCreateRequest;
import com.example.api_ecommerce.dto.request.OrderDetailRequest;
import com.example.api_ecommerce.dto.request.OrderUpdateRequest;
import com.example.api_ecommerce.entity.Order;
import com.example.api_ecommerce.entity.Product;
import com.example.api_ecommerce.enums.OrderStatus;
import com.example.api_ecommerce.enums.OrderStatusManager;
import com.example.api_ecommerce.exception.ApiRuntimeException;
import com.example.api_ecommerce.exception.ErrorCode;
import com.example.api_ecommerce.mapper.OrderDetailMapper;
import com.example.api_ecommerce.mapper.OrderMapper;
import com.example.api_ecommerce.repository.OrderRepository;
import com.example.api_ecommerce.repository.OrderDetailRepository;
import com.example.api_ecommerce.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    ProductRepository productRepository;
    OrderRepository orderRepository;
    OrderDetailRepository orderDetailRepository;
    OrderMapper orderMapper;
    OrderDetailMapper orderDetailMapper;

    @Transactional
    public Order createOrder(OrderCreateRequest dto) {
        var order = orderMapper.toOrder(dto);
        List<String> listId = dto.getListProducts()
                .stream()
                .map(OrderDetailRequest::getProductId)
                .collect(Collectors.toList());

        List<Product> listProduct = productRepository.findAllById(listId);

        if (listProduct.size() != listId.size()) {
            throw new ApiRuntimeException(ErrorCode.PRODUCT_NOT_EQUAL);
        }

        Map<String, Long> priceMap = listProduct.stream()
                .collect(Collectors.toMap(Product::getId, Product::getPrice));

        var orderDetails = orderDetailMapper.toOrderDetail(dto.getListProducts()).stream()
                .peek(item -> item.setPrice(priceMap.getOrDefault(item.getProductId(), 0L)))
                .toList();

        order.setListProducts(orderDetailRepository.saveAll(orderDetails));
        order.setStatus(OrderStatus.PENDING.name());
        order.setDeliveryFee("standard".equals(dto.getDeliveryType().toLowerCase())
                ? 20000 : "express".equals(dto.getDeliveryType().toLowerCase()) ? 40000 : 0);
        order.setCreatedAt(LocalDate.now());
        order.setUpdateAt(LocalDate.now());
        order.setDisplay(true);
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrder(String orderId, OrderUpdateRequest dto) {
        Order order = getOrderById(orderId);

        if (!OrderStatusManager.canTransition(
                OrderStatus.fromString(order.getStatus()),
                OrderStatus.fromString(dto.getStatus()))
        ) {
            throw new ApiRuntimeException(ErrorCode.ORDER_STATUS_NOT_VALID);
        }
        order.setStatus(dto.getStatus());
        order.setPaid(dto.isPaid());
        return orderRepository.save(order);
    }


    public List<Order> getOrder() {
        return orderRepository.findAll();
    }


    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.ORDER_NOT_EXISTED)
        );
    }

    public void deleteOrder(String orderId) {
        Order order = getOrderById(orderId);
        order.setDisplay(false);
        orderRepository.save(order);
    }
}
