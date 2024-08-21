package com.example.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entities.PublisherEntity;
import com.example.entities.UserEntity;

public interface PublisherRepository extends JpaRepository<PublisherEntity, Long>{

}
