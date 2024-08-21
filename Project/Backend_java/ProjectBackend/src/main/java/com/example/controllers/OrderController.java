package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.GenerateOtpDTO;
import com.example.dto.OrderAddDTO;
import com.example.dto.PublisherRegisterDTO;
import com.example.dto.RecieptDTO;
import com.example.dto.UniversalDTO;
import com.example.response.ApiResponseSuccess;
import com.example.services.OrderService;
import com.example.services.PublisherService;


import jakarta.validation.Valid;
import lombok.Getter;



@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {
	@Autowired
	private OrderService orderService;
	@PostMapping(value="/make")
	public ResponseEntity<?> makeOrder(@RequestBody @Valid OrderAddDTO order){
	ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
	response.setData(orderService.placeOrder(order));
	return ResponseEntity.ok(response);
 }
	@PostMapping(value="/generateOTP")
	public ResponseEntity<?> generateOTP(@RequestBody GenerateOtpDTO dto){
	ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
	response.setData(orderService.generateOTP(dto));
	return ResponseEntity.ok(response);
 }
	@PostMapping(value="/validateOTP")
	public ResponseEntity<?> validateOTP(@RequestParam Long otp,@RequestParam Long orderId){
	ApiResponseSuccess<Long> response = new ApiResponseSuccess<>();
	response.setData(orderService.validateOTP(otp,orderId));
	return ResponseEntity.ok(response);
	
 }
@GetMapping("/{id}")
public ResponseEntity<?> getOrder(@PathVariable Long id){
	ApiResponseSuccess<RecieptDTO> response = new ApiResponseSuccess<>();
	response.setData(orderService.getOrder(id));
	return ResponseEntity.ok(response);
	}
@GetMapping("/weekly")
public ResponseEntity<?> getOrderDateForLast7Days(){
	ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
	UniversalDTO uvd = new UniversalDTO() {
	@Getter  UniversalDTO graph = orderService.getLast7DaysDataForAdmin();
	@Getter double daily = orderService.getDailyOverallSalesForAdmin();
	@Getter double monthly = orderService.getMonthlyOverallSalesForAdmin();
	};
	response.setData(uvd);
	return ResponseEntity.ok(response);
}
}