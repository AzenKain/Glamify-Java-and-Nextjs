package com.example.api_ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    boolean display = true;

    String username;
    String firstName;
    String lastName;
    String hash;
    @Lob
    @Column(columnDefinition = "TEXT")
    String refresh_token;
    String email;
    @ManyToMany
    Set<RoleEntity> role;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    String imgDisplay;
    LocalDate birthday;
    String address;
    String phoneNumber;
    LocalDate createdAt;
    LocalDate updateAt;

}
