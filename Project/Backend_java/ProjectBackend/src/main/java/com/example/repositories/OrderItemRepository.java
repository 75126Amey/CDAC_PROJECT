package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.BookAuthorEntity;
import com.example.entities.BookAuthorId;
import com.example.entities.BookEntity;
import com.example.entities.OrderItemEntity;
import com.example.entities.OrderItemId;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, OrderItemId>{

}
