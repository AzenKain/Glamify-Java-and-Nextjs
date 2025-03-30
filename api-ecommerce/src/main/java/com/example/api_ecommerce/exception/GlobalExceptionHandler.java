package com.example.api_ecommerce.exception;

import com.example.api_ecommerce.dto.response.ApiResponse;
import com.nimbusds.jose.JOSEException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.text.ParseException;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED_EXCEPTION.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(ErrorCode.UNAUTHORIZED.getMessage());
        apiResponse.setCode(ErrorCode.UNAUTHORIZED.getCode());
        return ResponseEntity.status(ErrorCode.UNAUTHORIZED.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = JOSEException.class)
    ResponseEntity<ApiResponse> handlingJOSEException(JOSEException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(ErrorCode.JWT_EXCEPTION.getMessage());
        apiResponse.setCode(ErrorCode.JWT_EXCEPTION.getCode());
        return ResponseEntity.status(ErrorCode.JWT_EXCEPTION.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = ParseException.class)
    ResponseEntity<ApiResponse> handlingParseException(ParseException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(ErrorCode.JWT_EXCEPTION.getMessage());
        apiResponse.setCode(ErrorCode.JWT_EXCEPTION.getCode());
        return ResponseEntity.status(ErrorCode.JWT_EXCEPTION.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(ErrorCode.INVALID_ARGUMENT.getMessage());
        apiResponse.setCode(ErrorCode.INVALID_ARGUMENT.getCode());
        return ResponseEntity.status(ErrorCode.INVALID_ARGUMENT.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = ApiRuntimeException.class)
    ResponseEntity<ApiResponse> handlingApiRuntimeException(ApiRuntimeException exception) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage(exception.getErrorCode().getMessage());
        apiResponse.setCode(exception.getErrorCode().getCode());
        return ResponseEntity.status(exception.getErrorCode().getStatusCode()).body(apiResponse);
    }
}
