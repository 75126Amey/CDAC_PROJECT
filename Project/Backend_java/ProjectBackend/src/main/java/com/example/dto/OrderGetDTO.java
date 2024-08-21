package com.example.dto;

import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.entities.OrderStatus;
import com.example.entities.Status;

import lombok.Getter;

@Getter
@Setter
public class OrderGetDTO {
private Long id;
private LocalDateTime date;
private String orderNo;
private OrderStatus status;
}
