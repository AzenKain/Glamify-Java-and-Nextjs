package com.example.api_ecommerce.controller;

import com.example.api_ecommerce.dto.request.OrderCreateRequest;
import com.example.api_ecommerce.dto.request.OrderUpdateRequest;
import com.example.api_ecommerce.dto.response.ApiResponse;
import com.example.api_ecommerce.dto.response.UserResponse;
import com.example.api_ecommerce.entity.Order;
import com.example.api_ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;

    @GetMapping("/all")
    ApiResponse<List<Order>> getOrder() {
        ApiResponse<List<Order>> response = new ApiResponse<>();
        response.setResult(orderService.getOrder());
        return response;
    }

    @GetMapping("/id/{orderId}")
    ApiResponse<Order> getOrderById(
            @PathVariable("orderId") String orderId)
    {
        ApiResponse<Order> response = new ApiResponse<>();
        response.setResult(orderService.getOrderById(orderId));
        return response;
    }

    @PostMapping("/create")
    ApiResponse<Order> createRole(@RequestBody @Valid OrderCreateRequest request) {
        ApiResponse<Order> response = new ApiResponse<>();
        response.setResult(orderService.createOrder(request));
        return response;
    }

    @PutMapping("/update/{orderId}")
    ApiResponse<Order> updateOrder(
            @PathVariable("orderId") String orderId,
            @RequestBody OrderUpdateRequest request
    ) {
        ApiResponse<Order> response = new ApiResponse<>();
        response.setResult(orderService.updateOrder(orderId, request));
        return response;
    }

    @DeleteMapping("delete/{orderId}")
    ApiResponse deleteOrder(
            @PathVariable("orderId") String orderId
    ) {
        orderService.deleteOrder(orderId);
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setMessage("Role has been deleted");
        return response;
    }
}
