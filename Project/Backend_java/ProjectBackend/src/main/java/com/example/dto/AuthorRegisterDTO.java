package com.example.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;


import com.example.entities.Role;
import com.example.entities.Status;


import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthorRegisterDTO {
	@Email
	String email;
	String password;
	Role role=Role.valueOf("AUTHOR");
	String firstName;
	String lastName;
	String phoneNo; 
	LocalDate dob;        
	MultipartFile photo;
	MultipartFile identification;
	String bankAccountNo;
	String ifscCode;
	Status status=Status.valueOf("PENDING");
}
