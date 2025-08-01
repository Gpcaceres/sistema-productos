package com.example.products.products.services; // Add this line

import com.example.products.products.models.entities.Product;
import java.util.List; // Import List
import java.util.Optional; // Import Optional

public interface ProductService {
    List<Product> getAllProducts(); // Corrected: Capital 'L' for List
    Optional<Product> getProductById(Long id);
    Product createProduct(Product newProduct);
    Product updateProduct(Long id, Product updatedProduct);
    void deleteProduct(Long id);
}