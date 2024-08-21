package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.BookAuthorEntity;
import com.example.entities.BookAuthorId;
import com.example.entities.BookEntity;

public interface BookAuthorRepository extends JpaRepository<BookAuthorEntity, BookAuthorId>{
@Query("Select b from BookAuthorEntity b where b.book.id=:id")
List<BookAuthorEntity> getBookAuthorsByBookId(Long id);
}
