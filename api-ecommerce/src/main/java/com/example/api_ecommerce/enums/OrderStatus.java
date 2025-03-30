package com.example.api_ecommerce.enums;

import com.example.api_ecommerce.exception.ApiRuntimeException;
import com.example.api_ecommerce.exception.ErrorCode;

public enum OrderStatus {
    CREATED,
    PENDING,
    CONFIRMED,
    DELIVERY,
    COMPLETED,
    CANCELLED,
    REFUNDED
    ;
    public static OrderStatus fromString(String status) {
        try {
            return OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new ApiRuntimeException(ErrorCode.ORDER_STATUS_NOT_VALID);
        }
    }
}
