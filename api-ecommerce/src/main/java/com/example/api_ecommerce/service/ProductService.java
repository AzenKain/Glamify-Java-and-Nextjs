package com.example.api_ecommerce.service;

import com.example.api_ecommerce.dto.request.ProductRequest;
import com.example.api_ecommerce.entity.Product;
import com.example.api_ecommerce.entity.ProductImage;
import com.example.api_ecommerce.exception.ApiRuntimeException;
import com.example.api_ecommerce.exception.ErrorCode;
import com.example.api_ecommerce.mapper.ProductImageMapper;
import com.example.api_ecommerce.mapper.ProductMapper;
import com.example.api_ecommerce.repository.ProductImageRepository;
import com.example.api_ecommerce.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository productRepository;
    ProductImageRepository productImageRepository;
    ProductMapper productMapper;
    ProductImageMapper productImageMapper;

    @Transactional
    public Product createProduct(ProductRequest dto) {
        var product = productMapper.toProduct(dto);
        product.setImgDisplay(
                productImageRepository.saveAll(
                        productImageMapper.toListProductImage(
                                dto.getImgDisplay()
                        )
                )
        );
        product.setDisplay(true);
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(String productId, ProductRequest dto) {
        Product product = getProductById(productId);
        productMapper.updateProduct(product, dto);
        if (dto.getImgDisplay() != null && !dto.getImgDisplay().isEmpty()) {
            List<ProductImage> newImages = productImageMapper.toListProductImage(dto.getImgDisplay());
            newImages = productImageRepository.saveAll(newImages);
            product.getImgDisplay().clear();
            product.getImgDisplay().addAll(newImages);
        }

        return productRepository.save(product);
    }

    public List<Product> getTopProducts(int quantity) {
        return productRepository.findTopProducts(quantity);
    }

    public List<Product> getProduct() {
        return productRepository.findByDisplayTrue();
    }

    public Product getProductById(String id) {
        return productRepository.findByIdAndDisplayTrue(id).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.PRODUCT_NOT_EXISTED)
        );
    }

    public void deleteProduct(String productId) {
        Product product = getProductById(productId);
        product.setDisplay(false);
        productRepository.save(product);
    }
}
