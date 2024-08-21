package com.example.controllers;

import java.util.List;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.AuthorRegisterDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.ProAuthorDetailsDTO;
import com.example.dto.SelfAuthorDetailsDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.Status;
import com.example.response.ApiResponseSuccess;
import com.example.services.AuthorService;
import com.example.services.ProAuthorService;

import jakarta.validation.Valid;
import lombok.Getter;



@RestController
@RequestMapping("/author")
@CrossOrigin
public class AuthorController {
	@Autowired
	private  AuthorService services;
	@Autowired
	private ProAuthorService proAuthorService;
	@PostMapping(value="/register",consumes = "multipart/form-data")
	public ResponseEntity<?> registerUser(@ModelAttribute @Valid AuthorRegisterDTO user){
	ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
	response.setData(services.registerAuthor(user));
	return ResponseEntity.ok(response);
	}
	@GetMapping("/details")
	public ResponseEntity<?> getAuthorDetails(){
		ApiResponseSuccess<SelfAuthorDetailsDTO> response = new ApiResponseSuccess<>();
		response.setData(services.getAuthorDetails());
		return ResponseEntity.ok(response);
		
	}
	@GetMapping("/image/photo/{id}")
	public byte[] getPhoto(@PathVariable Long id) {
		return services.photoOfAuthor(id);
	}
	@GetMapping("/image/identification/{id}")
	public byte[] getIdentification(@PathVariable Long id) {
		return services.identificationOfAuthor(id);
	}
	@GetMapping("/pending")
	public ResponseEntity<?> getPendingAuthors(){
		ApiResponseSuccess<List<SelfAuthorDetailsDTO>> response = new ApiResponseSuccess<>();
		response.setData(services.getPendingAuthors());
		return ResponseEntity.ok(response);
		
	}
	@PatchMapping("/status/{id}")
	public ResponseEntity<?> updateAuthorStatus(@RequestParam(required = false) Status status,@PathVariable Long id){
		ApiResponseSuccess<SelfAuthorDetailsDTO> response = new ApiResponseSuccess<>();
		response.setData(services.updateAuthorDetails(id, status));
		return ResponseEntity.ok(response);
		
	}
	@GetMapping("/details/pro")
	public ResponseEntity<?> getProAuthorDetails(){
		ApiResponseSuccess<ProAuthorDetailsDTO> response = new ApiResponseSuccess<>();
		response.setData(services.getProAuthorDetails());
		return ResponseEntity.ok(response);
	}
	@GetMapping(value="/weekly")
	public ResponseEntity<?> getOrderDateForLast7Days(){
		ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
		UniversalDTO uvd = new UniversalDTO() {
		@Getter  UniversalDTO graph = services.getLast7DaysDataForAuthor();
		@Getter double daily = services.getDailyOverallSalesForAuthor();
		@Getter double monthly = services.getMonthlyOverallSalesForAuthor();
		};
		response.setData(uvd);
		return ResponseEntity.ok(response);
	}
	@GetMapping("/books")
	public ResponseEntity<?> getBooksByAuthor(){
		ApiResponseSuccess<List<BookViewDTO>> response = new ApiResponseSuccess<>();
		response.setData(services.getBooksByAuthor());
		return ResponseEntity.ok(response);
	}
}