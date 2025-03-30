package com.example.api_ecommerce.mapper;

import com.example.api_ecommerce.dto.request.UserCreateRequest;
import com.example.api_ecommerce.dto.request.UserUpdateRequest;
import com.example.api_ecommerce.dto.response.UserResponse;
import com.example.api_ecommerce.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreateRequest dto);
    UserResponse toUserResponse(User user);
    List<UserResponse> toListUserResponse(List<User> users);
    @Mapping(target = "role", ignore = true)
    void updateUser(@MappingTarget  User user, UserUpdateRequest dto);
}
