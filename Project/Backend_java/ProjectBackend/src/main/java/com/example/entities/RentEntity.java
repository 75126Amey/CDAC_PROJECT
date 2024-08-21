package com.example.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="rent_item")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RentEntity {
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
@Column(name = "start_date")
private LocalDateTime rentStartDate = LocalDate.now().atStartOfDay();
@Column(name = "end_date")
@Future
private LocalDateTime rentEndDate;
@Column(name = "rent_price")
double rentPerDay;
public RentEntity(BookEntity book,OrderEntity order,double rentPerDay,LocalDateTime rentEndDate) {
	this.book = book;
	this.order = order;
	this.rentEndDate = rentEndDate;
	this.rentPerDay = rentPerDay;
}
}
