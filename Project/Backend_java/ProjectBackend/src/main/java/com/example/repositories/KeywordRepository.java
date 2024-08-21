package com.example.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.BookEntity;
import com.example.entities.KeywordsEntity;

public interface KeywordRepository extends JpaRepository<KeywordsEntity, Long>{
@Query("Select b from BookEntity b JOIN b.keywords k where k.keyword like %:name% and b.status='APPROVED'")
List<BookEntity> getBooksByKeyWord(String name);
}
