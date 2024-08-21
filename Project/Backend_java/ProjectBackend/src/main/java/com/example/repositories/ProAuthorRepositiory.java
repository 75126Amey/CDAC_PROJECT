package com.example.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.BookEntity;
import com.example.entities.ProAuthorEntity;

public interface ProAuthorRepositiory extends JpaRepository<ProAuthorEntity, Long>{
public Optional<ProAuthorEntity> findByEmail(String email);
public boolean existsByEmail(String email);
@Query("Select book from BookEntity book join book.bookAuthors auth where auth.author.id=:id")
public List<BookEntity> getBookByAuthor(Long id);
@Query("Select book from BookEntity book join book.bookAuthors auth where auth.author.id=:id and book.status='APPROVED'")
List<BookEntity> get5BookByAuthor(Long id,Pageable page);
}
