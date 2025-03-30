package com.example.api_ecommerce.mapper;

import com.example.api_ecommerce.dto.request.RoleRequest;
import com.example.api_ecommerce.dto.response.RoleResponse;
import com.example.api_ecommerce.entity.RoleEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleEntity toRole(RoleRequest dto);
    RoleResponse toRoleResponse(RoleEntity roleEntity);
    List<RoleResponse> toListRoleResponse(List<RoleEntity> roles);
    void updateRole(@MappingTarget RoleEntity roleEntity, RoleRequest dto);
}
