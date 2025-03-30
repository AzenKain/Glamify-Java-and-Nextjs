package com.example.api_ecommerce.dto.request;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderCreateRequest {
    long totalAmount;
    List<OrderDetailRequest> listProducts;

    String notes;
    String deliveryType;
    String city;
    String district;
    String address;

    String email;
    String firstName;
    String lastName;
    String phoneNumber;

}
