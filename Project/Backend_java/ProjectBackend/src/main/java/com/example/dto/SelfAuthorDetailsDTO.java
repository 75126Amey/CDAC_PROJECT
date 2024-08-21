package com.example.dto;

import java.time.LocalDate;
import com.example.entities.Role;
import com.example.entities.Status;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelfAuthorDetailsDTO {
	Long id;
	String firstName;
	String lastName;
	String phoneNo; 
	LocalDate dob;    
	Role role=Role.valueOf("AUTHOR");
	String bankAccountNo;
	String ifscCode;
	Status status;
	String email;
}
