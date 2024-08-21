package com.example.dto;

import java.time.LocalDate;

import com.example.entities.Profession;
import com.example.entities.Role;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerRegisterDTO {
	@Email
	String email;
	String password;
	Role role=Role.valueOf("CUSTOMER");
	String firstName;
	String lastName;
	String phoneNo; 
	LocalDate dob;        
	Profession profession; 
	double balance; 
}
