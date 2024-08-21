package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.BookSearchViewDTO;
import com.example.dto.CategoryAddDTO;
import com.example.dto.CategoryGetDTO;
import com.example.response.ApiResponseSuccess;
import com.example.services.CategoryServices;


@RestController
@RequestMapping("/category")
@CrossOrigin
@Validated
public class CategoryController {
	@Autowired
	private CategoryServices services;
	
	@PostMapping("/add")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> addCategory(@RequestBody CategoryAddDTO cat){
	ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
	response.setData(services.addCategory(cat));
	return ResponseEntity.ok(response);
			
}
	@GetMapping
	public ResponseEntity<?> getAllCategories(){
		ApiResponseSuccess<List<CategoryGetDTO>> response = new ApiResponseSuccess<>();
		response.setData(services.getCategories());
		return ResponseEntity.ok(response);
	
	}
	@GetMapping("/books/{id}")
	public ResponseEntity<?> getAllBooksByCategoryId(@PathVariable Long id){
		ApiResponseSuccess<List<BookSearchViewDTO>> response = new ApiResponseSuccess<>();
		response.setData(services.getBooksByCategoryId(id));
		return ResponseEntity.ok(response);
	
	}
}
