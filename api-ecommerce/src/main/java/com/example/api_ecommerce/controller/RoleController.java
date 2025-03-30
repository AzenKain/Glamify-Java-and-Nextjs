package com.example.api_ecommerce.controller;

import com.example.api_ecommerce.dto.request.RoleRequest;
import com.example.api_ecommerce.dto.request.UserCreateRequest;
import com.example.api_ecommerce.dto.request.UserUpdateRequest;
import com.example.api_ecommerce.dto.response.ApiResponse;
import com.example.api_ecommerce.dto.response.RoleResponse;
import com.example.api_ecommerce.dto.response.UserResponse;
import com.example.api_ecommerce.entity.RoleEntity;
import com.example.api_ecommerce.service.RoleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
    RoleService roleService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<List<RoleResponse>> getRoles() {
        ApiResponse<List<RoleResponse>> response = new ApiResponse<>();
        response.setResult(roleService.getRoles());
        return response;
    }

    @PostMapping("/create")
    ApiResponse<RoleResponse> createRole(@RequestBody @Valid RoleRequest request) {
        ApiResponse<RoleResponse> response = new ApiResponse<>();
        response.setResult(roleService.createRole(request));
        return response;
    }

    @PutMapping("/update/{roleId}")
    ApiResponse<RoleResponse> updateRole(
            @PathVariable("roleId") String roleId,
            @RequestBody RoleRequest request
    ) {
        ApiResponse<RoleResponse> response = new ApiResponse<>();
        response.setResult(roleService.updateRole(roleId, request));
        return response;
    }

    @DeleteMapping("/delete/{roleId}")
    ApiResponse deleteRole(
            @PathVariable("roleId") String roleId
    ) {
        roleService.deleteRole(roleId);
        ApiResponse<UserResponse> response = new ApiResponse<>();
        response.setMessage("Role has been deleted");
        return response;
    }
}
