package com.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.BookAuthorEntity;
import com.example.entities.BookAuthorId;
import com.example.entities.BookEntity;
import com.example.entities.OrderItemEntity;
import com.example.entities.OrderItemId;
import com.example.entities.RentEntity;

public interface RentItemRepositiory extends JpaRepository<RentEntity, OrderItemId>{
	@Query("Select r from RentEntity r where r.order.customer.email=:email and r.rentEndDate>CURRENT_TIMESTAMP and r.order.orderStatus='SUCCESS'")
	public List<RentEntity> bookIdsofBooksRentedByCustomer(String email);
	@Query("Select r from RentEntity r where r.order.customer.email=:email and r.order.orderStatus='SUCCESS'")
	public List<RentEntity> bookIdsofBooksRentedByCustomerForReview(String email); //Check if customer can leave a review
}
