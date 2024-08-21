package com.example.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.UserEntity;

public interface UserRepositiory extends JpaRepository<UserEntity, Long>{
public Optional<UserEntity> findByEmail(String email);
public boolean existsByEmail(String email);
}
