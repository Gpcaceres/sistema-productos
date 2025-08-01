package com.example.products.products.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "categories", url = "${CATEGORIES_API_BASE}")
public interface CategoryClient {
  @GetMapping("/{id}")
  CategoryDTO getById(@PathVariable("id") Long id);
}

