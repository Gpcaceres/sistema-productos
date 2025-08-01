package com.categorias.categorias.services;
import com.categorias.categorias.models.entities.Category;

import java.util.List;
import java.util.Optional;


public interface CategoryService {
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(Long id);
    Category createCategory(Category newCategory);
    Category updateCategory(Long id, Category updatedCategory);
    void deleteCategory(Long id);
    
}
