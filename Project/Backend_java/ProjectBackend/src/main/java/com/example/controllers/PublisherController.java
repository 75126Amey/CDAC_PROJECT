package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.PublisherRegisterDTO;
import com.example.dto.UniversalDTO;
import com.example.response.ApiResponseSuccess;
import com.example.services.PublisherService;


import jakarta.validation.Valid;
import lombok.Getter;



@RestController
@RequestMapping("/publisher")
@CrossOrigin
public class PublisherController {
	@Autowired
	private PublisherService services;
	@PostMapping(value="/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid PublisherRegisterDTO user){
	ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
	response.setData(services.registerPublisher(user));
	return ResponseEntity.ok(response);
	
}
	@GetMapping(value="/weekly")
	public ResponseEntity<?> getOrderDateForLast7Days(){
		ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
		UniversalDTO uvd = new UniversalDTO() {
		@Getter  UniversalDTO graph = services.getLast7DaysDataForPublisher();
		@Getter double daily = services.getDailyOverallSalesForPublisher();
		@Getter double monthly = services.getMonthlyOverallSalesForPublisher();
		};
		response.setData(uvd);
		return ResponseEntity.ok(response);
	}
	@GetMapping(value="/details")
	public ResponseEntity<?> getPublisherDetails(){
		ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
		response.setData(services.getPublisherDetails());
		return ResponseEntity.ok(response);
	}
}