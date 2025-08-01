package com.example.products.products.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.products.products.models.entities.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {
    // Additional query methods can be defined here if needed

    
}