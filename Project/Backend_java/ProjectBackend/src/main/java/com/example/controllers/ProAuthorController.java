package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.BookSearchViewDTO;
import com.example.dto.ProAuthorDetailsDTO;
import com.example.dto.ProAuthorRegisterDTO;
import com.example.dto.UniversalDTO;
import com.example.response.ApiResponseSuccess;
import com.example.services.ProAuthorService;

import jakarta.validation.Valid;
import lombok.Getter;



@RestController
@RequestMapping("/proAuthor")
@CrossOrigin
public class ProAuthorController {
	@Autowired
	private  ProAuthorService proAuthorservices;
	@PostMapping(value="/register",consumes = "multipart/form-data")
	public ResponseEntity<?> registerUser(@ModelAttribute @Valid ProAuthorRegisterDTO user){
	ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
	response.setData(proAuthorservices.registerAuthor(user));
	return ResponseEntity.ok(response);
	
}
	@PutMapping("/details")
		public ResponseEntity<?> updateAuthorDetails(@ModelAttribute ProAuthorDetailsDTO proAuthor){
			ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
			response.setData(proAuthorservices.updateAuthorDetails(proAuthor));
			return ResponseEntity.ok(response);
			
		}
	@GetMapping("/details/{id}")
	public ResponseEntity<?> getAuthorDetails(@PathVariable Long id){
		ApiResponseSuccess<UniversalDTO> response = new ApiResponseSuccess<>();
		UniversalDTO univ = new UniversalDTO() {
		@Getter	ProAuthorDetailsDTO pro = proAuthorservices.getAuthorDetails(id);
		@Getter	List<BookSearchViewDTO> books = proAuthorservices.get5BooksByAuthor(id);
		};
		response.setData(univ);
		return ResponseEntity.ok(response);
		
	}
	@GetMapping("/image/{id}")
	public byte[] getAuthorImage(@PathVariable Long id){
		return proAuthorservices.getImageByAuthor(id);
		
	}
	
}