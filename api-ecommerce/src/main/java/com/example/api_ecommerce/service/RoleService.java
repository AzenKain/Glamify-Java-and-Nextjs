package com.example.api_ecommerce.service;

import com.example.api_ecommerce.dto.request.RoleRequest;
import com.example.api_ecommerce.dto.response.RoleResponse;
import com.example.api_ecommerce.entity.RoleEntity;
import com.example.api_ecommerce.entity.User;
import com.example.api_ecommerce.exception.ApiRuntimeException;
import com.example.api_ecommerce.exception.ErrorCode;
import com.example.api_ecommerce.mapper.RoleMapper;
import com.example.api_ecommerce.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public RoleResponse createRole(RoleRequest dto) {
        if (roleRepository.existsByName(dto.getName().toUpperCase())) {
            throw new ApiRuntimeException(ErrorCode.ROLE_EXISTED);
        }
        var role = roleMapper.toRole(dto);
        role.setName(role.getName().toUpperCase());
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    public RoleResponse updateRole(String roleId, RoleRequest dto) {
        if (roleRepository.existsByName(dto.getName().toUpperCase())) {
            throw new ApiRuntimeException(ErrorCode.ROLE_EXISTED);
        }
        RoleEntity role = findRoleById(roleId);
        roleMapper.updateRole(role, dto);
        role.setName(role.getName().toUpperCase());
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    public List<RoleResponse> getRoles() {
        return roleMapper.toListRoleResponse(roleRepository.findAll());
    }

    private RoleEntity findRoleById(String id) {
        return roleRepository.findById(id).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.ROLE_NOT_EXISTED)
        );
    }

    public void deleteRole(String roleId) {
        roleRepository.deleteById(roleId);
    }

}
