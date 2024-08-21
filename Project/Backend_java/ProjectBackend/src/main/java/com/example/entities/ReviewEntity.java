package com.example.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "review",uniqueConstraints = 
@UniqueConstraint(columnNames={"customer_id", "book_id"}))
public class ReviewEntity extends BaseEntity{
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private CustomerEntity customer;
	@ManyToOne
	@JoinColumn(name="book_id")
	private BookEntity book;
	private double rating;
	@Column(length = 500)
	private String comment;
}
