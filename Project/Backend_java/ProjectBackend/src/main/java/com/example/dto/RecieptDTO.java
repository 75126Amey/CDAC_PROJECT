package com.example.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.entities.OrderStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RecieptDTO {
private String customerName;
private LocalDateTime orderDate;
private OrderStatus orderStatus;
private String transactionNo;
private double baseAmt;
private double discountAmt;
private double netAmt;
private List<RecieptItemsDTO> orderItems;
private List<RecieptItemsDTO> rentItems;
private String orderNo;
}
