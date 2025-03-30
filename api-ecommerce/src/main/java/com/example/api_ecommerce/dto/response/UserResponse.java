package com.example.api_ecommerce.dto.response;

import com.example.api_ecommerce.entity.RoleEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    String id;
    boolean display;
    String username;
    String firstName;
    String lastName;
    String email;
    Set<RoleEntity> role;
    String imgDisplay;
    LocalDate birthday;
    String address;
    String phoneNumber;
    LocalDate createdAt;
    LocalDate updateAt;
}
