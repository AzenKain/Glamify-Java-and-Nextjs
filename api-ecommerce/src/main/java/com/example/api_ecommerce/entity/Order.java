package com.example.api_ecommerce.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "display")
    boolean display = true;

    @NotNull
    @Column(name = "total_amount")
    long totalAmount;

    @NotNull
    @Column(name = "status")
    String status;

    @ManyToMany(cascade = CascadeType.ALL)
    List<OrderDetail> listProducts;

    @Column(name = "notes")
    String notes;

    @Column(name = "delivery_type")
    String deliveryType;

    @Column(name = "delivery_fee")
    long deliveryFee;

    @Column(name = "city")
    String city;

    @Column(name = "district")
    String district;

    @NotNull
    @Column(name = "address")
    String address;

    @Column(name = "email")
    String email;

    @NotNull
    @Column(name = "first_name")
    String firstName;

    @NotNull
    @Column(name = "last_name")
    String lastName;

    @NotNull
    @Column(name = "phone_number")
    String phoneNumber;

    @Column(name = "paid")
    boolean paid;

    @Column(name = "bank")
    String bank;

    @Column(name = "track_id")
    String trackId;

    @Column(name = "created_at")
    LocalDate createdAt;

    @Column(name = "update_at")
    LocalDate updateAt;
}