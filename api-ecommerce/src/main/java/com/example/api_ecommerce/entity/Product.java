package com.example.api_ecommerce.entity;

import jakarta.persistence.*;
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
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String productName;
    boolean display = true;
    long cost;
    long price;
    int stockQuantity;
    @ManyToMany
    List<ProductImage> imgDisplay;
    String productType;
    List<String> color;
    List<String> size;
    int buyCount;
    double rating;
    List<String> tags;
    String company;
    List<String> materials;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    String description;
    LocalDate createdAt;
    LocalDate updateAt;
}


