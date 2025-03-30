package com.example.api_ecommerce.repository;

import com.example.api_ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByDisplayTrue();
    Optional<Product> findByIdAndDisplayTrue(String id);

    @Query("SELECT p FROM Product p ORDER BY p.id ASC LIMIT ?1")
    List<Product> findTopProducts(int quantity);
}