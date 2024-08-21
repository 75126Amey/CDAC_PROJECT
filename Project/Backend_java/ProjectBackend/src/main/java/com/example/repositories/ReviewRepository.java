package com.example.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.ReviewEntity;


public interface ReviewRepository extends JpaRepository<ReviewEntity, Long>{
@Query("Select r from ReviewEntity r where r.book.id=:id order by r.createdAt desc")
public List<ReviewEntity> getReviewsByBook(Long id);
}
