package com.example.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.PaymentEntity;
import com.example.entities.ReviewEntity;

public interface PaymentRepo extends JpaRepository<PaymentEntity, Long>{

}
