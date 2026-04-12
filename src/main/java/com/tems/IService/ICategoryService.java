package com.tems.IService;

import java.util.List;

import com.tems.model.Category;

public interface ICategoryService {

    Category createCategory(Category category);

    List<Category> getAllCategories();

    Category getCategoryById(Integer id);

    Category updateCategory(Integer id, Category category);

    void deleteCategory(Integer id);
}
