package com.example.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.SelfAuthorEntity;


public interface AuthorRepositiory extends JpaRepository<SelfAuthorEntity, Long>{
public Optional<SelfAuthorEntity> findByEmail(String email);
public boolean existsByEmail(String email);
@Query("Select auth from SelfAuthorEntity auth where auth.status='PENDING'")
public List<SelfAuthorEntity> getPendingAuthors();
}
