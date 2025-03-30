package com.example.api_ecommerce.controller;

import com.example.api_ecommerce.dto.response.ApiResponse;
import com.example.api_ecommerce.dto.request.AuthRequest;
import com.example.api_ecommerce.dto.response.AuthResponse;
import com.example.api_ecommerce.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;

    @PostMapping("login")
    ApiResponse<AuthResponse> login(
            @RequestBody AuthRequest request
    ) {
        AuthResponse res = authService.login(request);
        return ApiResponse.<AuthResponse>builder()
                .result(res).build();
    }

    @PostMapping("refresh")
    ApiResponse<AuthResponse> refresh(
    ) {
        AuthResponse res = authService.refresh();
        return ApiResponse.<AuthResponse>builder()
                .result(res).build();
    }
}
