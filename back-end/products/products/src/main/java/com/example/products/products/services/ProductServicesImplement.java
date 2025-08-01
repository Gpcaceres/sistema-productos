package com.example.products.products.services;

import com.example.products.products.client.CategoryClient;
import com.example.products.products.client.CategoryDTO;
import com.example.products.products.models.entities.Product;
import com.example.products.products.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServicesImplement implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryClient categoryClient;

    /** Si es true, valida la categoría llamando al microservicio de categorías */
    private final boolean validateCategory;

    public ProductServicesImplement(
            ProductRepository productRepository,
            CategoryClient categoryClient,
            @Value("${CATEGORIES_VALIDATE:false}") boolean validateCategory) {
        this.productRepository = productRepository;
        this.categoryClient = categoryClient;
        this.validateCategory = validateCategory;
    }

    @Override
    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(Product newProduct) {
        // Valida categoría solo si está activado
        if (validateCategory) {
            Long categoryId = newProduct.getCategory();
            if (categoryId == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category id is required");
            }
            try {
                CategoryDTO cat = categoryClient.getById(categoryId);
                if (cat == null || cat.getId() == null) {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, "Category with id " + categoryId + " not found");
                }
                // Guardamos solo el id (tu entidad usa Long category)
                newProduct.setCategory(cat.getId());
            } catch (Exception ex) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Error contacting categories service: " + ex.getMessage(),
                        ex
                );
            }
        }
        return productRepository.save(newProduct);
    }

    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }
        updatedProduct.setId(id);

        if (validateCategory) {
            Long categoryId = updatedProduct.getCategory();
            if (categoryId == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category id is required");
            }
            try {
                CategoryDTO cat = categoryClient.getById(categoryId);
                if (cat == null || cat.getId() == null) {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, "Category with id " + categoryId + " not found");
                }
                updatedProduct.setCategory(cat.getId());
            } catch (Exception ex) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Error contacting categories service: " + ex.getMessage(),
                        ex
                );
            }
        }
        return productRepository.save(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
