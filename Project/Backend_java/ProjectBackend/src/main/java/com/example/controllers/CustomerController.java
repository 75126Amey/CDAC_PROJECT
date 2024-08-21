package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.CustomerRegisterDTO;
import com.example.dto.LibraryViewDTO;
import com.example.dto.OrderGetDTO;
import com.example.dto.ReviewAddDTO;
import com.example.dto.UniversalDTO;
import com.example.response.ApiResponseSuccess;
import com.example.services.CustomerServices;


import jakarta.validation.Valid;



@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
	@Autowired
	private CustomerServices services;
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid CustomerRegisterDTO user){
	ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
	response.setData(services.registerCustomer(user));
	return ResponseEntity.ok(response);
}
	@GetMapping("/book")
	public ResponseEntity<?> getBookIdsByCustomer(){
		ApiResponseSuccess<List<Long>> response = new ApiResponseSuccess<>();
		response.setData(services.getBookIdByCustomer());
		return ResponseEntity.ok(response);	
	}
	@GetMapping("/book/rent")
	public ResponseEntity<?> getBookIdsRentedByCustomer(){
		ApiResponseSuccess<List<Long>> response = new ApiResponseSuccess<>();
		response.setData(services.getBookRentedIdByCustomer());
		return ResponseEntity.ok(response);	
	}
	@PostMapping("/book/comment")
	public ResponseEntity<?> addReview(@RequestBody ReviewAddDTO review){
		ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
		response.setData(services.addReview(review));
		return ResponseEntity.ok(response);
	}
	@PutMapping("/book/comment")
	public ResponseEntity<?> updateReview(@RequestBody ReviewAddDTO review){
		ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
		response.setData(services.updateReview(review));
		return ResponseEntity.ok(response);
	}
	@GetMapping("/book/reviewable")
	public ResponseEntity<?> getReviewableIds(){
		ApiResponseSuccess<List<Long>> response = new ApiResponseSuccess<>();
		response.setData(services.getReviewableBookIdsByCustomer());
		return ResponseEntity.ok(response);
	}
	@GetMapping("/book/library")
	public ResponseEntity<?> getLibraryBooks(){
		ApiResponseSuccess<List<LibraryViewDTO>> response = new ApiResponseSuccess<>();
		response.setData(services.getBooksForLibrary());
		return ResponseEntity.ok(response);
		
	}
	@GetMapping("/name")
	public ResponseEntity<?> getCustomerName(){
		ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
		response.setData(services.getCustomerName());
		return ResponseEntity.ok(response);
		
	}
	@GetMapping("/orders")
	public ResponseEntity<?> getCustomerOrders(){
		ApiResponseSuccess<List<OrderGetDTO>> response = new ApiResponseSuccess<>();
		response.setData(services.getCustomerOrders());
		return ResponseEntity.ok(response);
		
	}
	@GetMapping("/getOccupation")
	public ResponseEntity<?> getCustomerOccupation(){
		ApiResponseSuccess<String> response = new ApiResponseSuccess<>();
		response.setData(services.customerOccupation());
		return ResponseEntity.ok(response);
		
	}
}