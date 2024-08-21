package com.example.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
@EqualsAndHashCode(callSuper = false,onlyExplicitlyIncluded = true)
public class OrderEntity extends BaseEntity{
@Column(unique = true,nullable = false)
@EqualsAndHashCode.Include
private String orderNo;
@ManyToOne
@JoinColumn(name = "customer_id",nullable = false)
private CustomerEntity customer;
@OneToOne(cascade = CascadeType.ALL)
@JoinColumn(name = "payment_id")
private PaymentEntity payment;
@Enumerated(EnumType.STRING)
private OrderStatus orderStatus;
private LocalDateTime orderDate;
@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
private Set<OrderItemEntity> orderItems = new HashSet<OrderItemEntity>();
@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
private Set<RentEntity> rentItems = new HashSet<RentEntity>();
public void addItems(BookEntity book,double basePrice,double discount) {
	OrderItemEntity ord = new OrderItemEntity(book, this, basePrice, discount);
	orderItems.add(ord);
}
public void addRentItems(BookEntity book,double rentPerDay,LocalDateTime rentEndDate) {
	RentEntity rentEntity = new RentEntity(book, this, rentPerDay, rentEndDate);
	rentItems.add(rentEntity);
}
}

