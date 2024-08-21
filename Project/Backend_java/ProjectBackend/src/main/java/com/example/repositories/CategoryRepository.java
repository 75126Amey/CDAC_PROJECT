package com.example.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.BookEntity;
import com.example.entities.CategoryEntity;


public interface CategoryRepository extends JpaRepository<CategoryEntity, Long>{
	@Query("Select b from BookEntity b where b.category.name like %:name%")
	List<BookEntity> getBooksByAnyCategory(String name);	
	@Query("Select b from BookEntity b where b.category.id=:id and b.status='APPROVED'")
	List<BookEntity> getBooksByCategoryId(Long id);	
}
