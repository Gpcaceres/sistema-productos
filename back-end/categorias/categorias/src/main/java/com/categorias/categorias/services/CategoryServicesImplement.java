package com.categorias.categorias.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.categorias.categorias.repositories.CategoryRepository; // Importa tu CategoryRepository
import com.categorias.categorias.models.entities.Category; // Importa tu entidad Category
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service // Marca esta clase como un componente de servicio de Spring
@Transactional // Gestiona las transacciones de la base de datos
public class CategoryServicesImplement implements CategoryService { // Implementa la interfaz CategoryService

    private final CategoryRepository categoryRepository; // Inyecta el repositorio

    // Constructor para la inyección de dependencias
    public CategoryServicesImplement(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return (List<Category>) categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category createCategory(Category newCategory) {
        return categoryRepository.save(newCategory);
    }

    @Override
    public Category updateCategory(Long id, Category updatedCategory) {
        // Verifica si la categoría existe antes de intentar actualizarla
        if (categoryRepository.existsById(id)) {
            updatedCategory.setId(id); // Asegura que el ID de la categoría a actualizar sea el correcto
            return categoryRepository.save(updatedCategory);
        } else {
            // Si no se encuentra la categoría, lanza una excepción
            throw new EntityNotFoundException("Category not found with id: " + id);
        }
    }

    @Override
    public void deleteCategory(Long id) {
        // Verifica si la categoría existe antes de intentar eliminarla
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            // Si no se encuentra la categoría, lanza una excepción
            throw new EntityNotFoundException("Category not found with id: " + id);
        }
    }
}