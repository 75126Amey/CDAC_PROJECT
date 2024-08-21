package com.example.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.BookSearchViewDTO;
import com.example.dto.CategoryAddDTO;
import com.example.dto.CategoryGetDTO;

public interface CategoryServices {

public String addCategory(CategoryAddDTO catgeory);
public List<CategoryGetDTO> getCategories();
List<BookSearchViewDTO> getBooksByCategoryId(Long id);
}
