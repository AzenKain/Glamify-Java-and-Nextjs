package com.example.api_ecommerce.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(
            9999,
            "Uncategorized exception",
            HttpStatus.INTERNAL_SERVER_ERROR
    ),
    USER_EXISTED(
            1001,
            "User existed",
            HttpStatus.BAD_REQUEST
    ),
    INVALID_ARGUMENT(
            1002,
            "Invalid argument",
            HttpStatus.BAD_REQUEST
    ),
    USER_NOT_EXISTED(
            1003,
            "User not existed",
            HttpStatus.NOT_FOUND
    ),
    UNAUTHENTICATED(
            1004,
            "Unauthenticated",
            HttpStatus.UNAUTHORIZED
    ),
    UNAUTHORIZED(
         1005,
         "You do not have permission",
         HttpStatus.FORBIDDEN
    ),
    JWT_EXCEPTION(
            1006,
            "JWT exception",
            HttpStatus.UNAUTHORIZED
    ),
    ROLE_EXISTED(
            1007,
            "Role existed",
            HttpStatus.BAD_REQUEST
    ),
    ROLE_NOT_EXISTED(
            1008,
            "Role not existed",
            HttpStatus.NOT_FOUND
    ),
    PRODUCT_NOT_EXISTED(
            1008,
            "Product not existed",
            HttpStatus.NOT_FOUND
    ),
    PRODUCT_NOT_EQUAL(
            1008,
            "Product not equal",
            HttpStatus.NOT_FOUND
    ),
    ORDER_NOT_EXISTED(
            1009,
            "Order not existed",
            HttpStatus.NOT_FOUND
    ),
    ORDER_STATUS_NOT_VALID(
            1010,
            "Order status not valid",
            HttpStatus.BAD_REQUEST
    ),
    BANNED(
            1010,
            "You has banned",
            HttpStatus.FORBIDDEN
    ),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private int code;
    private String message;
    private HttpStatusCode statusCode;

}
