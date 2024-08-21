package com.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.BookSearchViewDTO;
import com.example.dto.CategoryAddDTO;
import com.example.dto.CategoryGetDTO;
import com.example.entities.BookEntity;
import com.example.entities.CategoryEntity;
import com.example.repositories.CategoryRepository;


@Service
@Transactional
public class CategoryServicesImpl implements CategoryServices{
	@Autowired
	private CategoryRepository categoryRepo;
	@Autowired
	private ModelMapper mapper;
	@Override
	public String addCategory(CategoryAddDTO cat) {
		Long parentId = cat.getParentId();
		CategoryEntity cat2;
		if(parentId==null) {
			cat2 = mapper.map(cat, CategoryEntity.class);
			categoryRepo.save(cat2);
		}
		else {
			
			CategoryEntity parentCat = categoryRepo.findById(parentId).orElseThrow();
			cat2 = mapper.map(cat, CategoryEntity.class);
			cat2.setParent(parentCat);
			parentCat.getCategories().add(cat2);
		}
		return "Category added";
	}
	@Override
	public List<CategoryGetDTO> getCategories() {
		List<CategoryEntity> categories = categoryRepo.findAll();
		List<CategoryGetDTO> cats = new ArrayList<CategoryGetDTO>();
		categories.forEach(category->{
		CategoryGetDTO cat = new CategoryGetDTO();
		cat.setName(category.getName());
		cat.setId(category.getId());
		cat.setParentId(null);
		if(category.getParent()!=null) {
		cat.setParentId(category.getParent().getId());
		}
		cats.add(cat);
		});
		//mapper.map(categories, List<CategoryGetDTO>.class);
		return cats;
	}
	@Override
	public List<BookSearchViewDTO> getBooksByCategoryId(Long id) {
			List<BookEntity> bookResultsByCategory = categoryRepo.getBooksByCategoryId(id);
			return bookResultsByCategory.stream().map(ele->{
				BookSearchViewDTO temp =   mapper.map(ele, BookSearchViewDTO.class);
				temp.setCategoryName(ele.getCategory().getName());
				if(ele.getPublisher()!=null) {
				temp.setPublisherName(ele.getPublisher().getName());
				}
				List<String> authorNames  = ele.getBookAuthors().stream().map(ele2->{
					return ele2.getAuthor().getFirstName() + " " + ele2.getAuthor().getLastName();
				}).collect(Collectors.toList());
				temp.setAuthors(authorNames);	
				return temp;
			}).collect(Collectors.toList());
		}
	

}
