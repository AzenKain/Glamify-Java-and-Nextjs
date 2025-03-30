package com.example.api_ecommerce.controller;

import com.example.api_ecommerce.dto.request.*;
import com.example.api_ecommerce.dto.response.ApiResponse;
import com.example.api_ecommerce.dto.response.UserResponse;
import com.example.api_ecommerce.entity.User;
import com.example.api_ecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreateRequest request) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.createUser(request));
        return response;
    }

    @PostMapping("/password-admin")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<UserResponse> updatePasswordAdmin(@RequestBody UserAdminPasswordRequest request) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.updatePasswordByAdmin(request));
        return response;
    }

    @PostMapping("/password-user")
    ApiResponse<UserResponse> updatePasswordAdmin(@RequestBody UserPasswordRequest request) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.updatePasswordUser(request));
        return response;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<List<UserResponse>> getUsers() {
        ApiResponse<List<UserResponse>> response = new ApiResponse<>();
        response.setResult(userService.getUsers());
        return response;
    }

    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.getUser(userId));
        return response;
    }

    @GetMapping("/detail")
    ApiResponse<UserResponse> getMyInfo() {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.getMyInfo());
        return response;
    }

    @PutMapping("/update/{userId}")
    ApiResponse<UserResponse> updateUser(
            @PathVariable("userId") String userId,
            @RequestBody UserUpdateRequest request
    ) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.updateUser(userId, request));
        return response;
    }

    @PutMapping("/role")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<UserResponse> updateRoleUser(
            @RequestBody UserRoleRequest request
    ) {
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setResult(userService.updateUserRoles(request));
        return response;
    }

    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse deleteUser(
            @PathVariable("userId") String userId
    ) {
        userService.deleteUser(userId);
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setMessage("User has been deleted");
        return response;
    }
}
