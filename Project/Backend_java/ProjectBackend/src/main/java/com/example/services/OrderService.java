package com.example.services;

import java.time.LocalDate;
import java.util.List;

import com.example.dto.GenerateOtpDTO;
import com.example.dto.OrderAddDTO;
import com.example.dto.RecieptDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.OrderEntity;

public interface OrderService {
public UniversalDTO placeOrder(OrderAddDTO orderDto);
public RecieptDTO getOrder(Long id);
double getMonthlyOverallSalesForAdmin();
double getDailyOverallSalesForAdmin();
UniversalDTO getLast7DaysDataForAdmin();
UniversalDTO getLast7DaysData(List<OrderEntity> orderList);
double getDailyOverallSales(List<OrderEntity> orderList);
UniversalDTO generateOTP(GenerateOtpDTO dto);
Long validateOTP(Long otp, Long id);
}
