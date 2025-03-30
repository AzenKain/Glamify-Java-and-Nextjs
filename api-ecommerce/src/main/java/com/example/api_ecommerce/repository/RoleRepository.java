package com.example.api_ecommerce.repository;

import com.example.api_ecommerce.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, String> {
    boolean existsByName(String name);
    Optional<RoleEntity> findByName(String name);
}
