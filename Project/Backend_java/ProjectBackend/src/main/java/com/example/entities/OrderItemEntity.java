package com.example.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="order_item")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class OrderItemEntity {
@EmbeddedId
private OrderItemId id = new OrderItemId();
@EqualsAndHashCode.Include
@ManyToOne
@MapsId("bookId")
private @Setter BookEntity book;
@EqualsAndHashCode.Include
@ManyToOne
@MapsId("orderId")
private OrderEntity order;
private double basePrice;
private double discountPercent;
public OrderItemEntity(BookEntity book,OrderEntity order,double basePrice,double discountPercent) {
	this.book = book;
	this.order = order;
	this.basePrice = basePrice;
	this.discountPercent = discountPercent;
}
}
