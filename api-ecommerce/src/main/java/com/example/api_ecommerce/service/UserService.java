package com.example.api_ecommerce.service;

import com.example.api_ecommerce.dto.request.*;
import com.example.api_ecommerce.dto.response.UserResponse;
import com.example.api_ecommerce.entity.RoleEntity;
import com.example.api_ecommerce.entity.User;
import com.example.api_ecommerce.enums.Role;
import com.example.api_ecommerce.exception.ApiRuntimeException;
import com.example.api_ecommerce.exception.ErrorCode;
import com.example.api_ecommerce.mapper.UserMapper;
import com.example.api_ecommerce.repository.RoleRepository;
import com.example.api_ecommerce.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;


    public UserResponse createUser(UserCreateRequest dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new ApiRuntimeException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new ApiRuntimeException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(dto);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setHash(passwordEncoder.encode(dto.getPassword()));
        HashSet<RoleEntity> roles = new HashSet<>();
        roles.add(findRoleAndCreate(Role.USER.name()));
        user.setRole(roles);
        return userMapper.toUserResponse(userRepository.save(user));
    }
    private RoleEntity findRoleAndCreate(String name) {
        if (!roleRepository.existsByName(name)){
            RoleEntity role = RoleEntity.builder()
                    .name(name)
                    .build();
            return roleRepository.save(role);
        }
        return roleRepository.findByName(name).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.ROLE_NOT_EXISTED)
        );
    }
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.USER_NOT_EXISTED)
        );
        return userMapper.toUserResponse(user);
    }

    public List<UserResponse> getUsers() {
        return userMapper.toListUserResponse(userRepository.findAll());
    }

    public UserResponse getUser(String id) {
        User user = getUserById(id);
        return userMapper.toUserResponse(user);
    }

    private User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.USER_NOT_EXISTED)
        );
    }

    public UserResponse updateUser(String userId, UserUpdateRequest dto) {
        User user = getUserById(userId);
        userMapper.updateUser(user, dto);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse updateUserRoles(UserRoleRequest dto) {
        var user = userRepository.findById(dto.getUserId()).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.USER_NOT_EXISTED)
        );

        Set<RoleEntity> roles;
        try {
            roles = dto.getRole().stream()
                    .map(role -> Role.valueOf(role.toUpperCase()))
                    .map(roleEnum -> roleRepository.findByName(roleEnum.name())
                            .orElseThrow(() -> new ApiRuntimeException(ErrorCode.ROLE_NOT_EXISTED)))
                    .collect(Collectors.toSet());
        } catch (IllegalArgumentException e) {
            throw new ApiRuntimeException(ErrorCode.ROLE_NOT_EXISTED);
        }

        user.setRole(roles);
        return userMapper.toUserResponse(userRepository.save(user));
    }


    public UserResponse updatePasswordUser(UserPasswordRequest dto) {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.USER_NOT_EXISTED)
        );

        boolean isBanned = user.getRole().stream()
                .anyMatch(role -> Role.BANNED.name().equals(role.getName().toUpperCase()));

        if (isBanned) {
            throw new ApiRuntimeException(ErrorCode.BANNED);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean isOk =  passwordEncoder.matches(dto.getOldPassword(), user.getHash());
        if (!isOk) {
            throw new ApiRuntimeException(ErrorCode.UNAUTHENTICATED);
        }
        user.setHash(passwordEncoder.encode(dto.getNewPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse updatePasswordByAdmin(UserAdminPasswordRequest dto) {
        User user = getUserById(dto.getUserId());

        boolean isBanned = user.getRole().stream()
                .anyMatch(role -> Role.BANNED.name().equals(role.getName().toUpperCase()));
        if (isBanned) {
            throw new ApiRuntimeException(ErrorCode.BANNED);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setHash(passwordEncoder.encode(dto.getPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId) {
        User user = getUserById(userId);
        user.setDisplay(false);
        userRepository.save(user);
    }
}
