package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewAddDTO {
	@JsonProperty(access = Access.WRITE_ONLY)
	private Long bookId;
	private double rating;
	private String comment;
	private Long id;
	@JsonProperty(access = Access.READ_ONLY)
	private Long customerId;
	private String customerName;
}
