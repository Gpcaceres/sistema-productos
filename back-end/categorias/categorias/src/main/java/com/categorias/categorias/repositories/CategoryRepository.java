package com.categorias.categorias.repositories;

import com.categorias.categorias.models.entities.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    // Additional query methods can be defined here if needed

    
}