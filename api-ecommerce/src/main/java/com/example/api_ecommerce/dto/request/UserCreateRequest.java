package com.example.api_ecommerce.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserCreateRequest {
    @Size(min = 3, message = "Username must be at least 3 character")
    String username;
    String firstName;
    String lastName;
    @Size(min = 8, message = "Password must be at least 8 character")
    String password;
    String email;
    LocalDate birthday;

}
