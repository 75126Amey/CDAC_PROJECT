package com.example.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.entities.OrderEntity;
import com.example.entities.OrderItemEntity;
import com.example.entities.PublisherEntity;
import com.example.entities.UserEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long>{
@Query("Select o.orderItems from OrderEntity o where o.customer.email=:email and o.orderStatus='SUCCESS'")
public List<OrderItemEntity> bookIdsofBooksPurchasedByCustomer(String email);
@Query("Select o from OrderEntity o where o.customer.id=:id and o.orderStatus='SUCCESS' order by o.orderDate desc")
public List<OrderEntity> orderIdsOfCustomer(Long id);
@Query(nativeQuery = true,value = "Select * from orders where order_date between :date1 and :date2 and order_status='SUCCESS'")
public List<OrderEntity> getOrderByDates(LocalDate date1,LocalDate date2);
}
