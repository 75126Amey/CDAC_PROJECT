package com.example.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ProAuthorDetailsDTO {
	Long id;
	String email;
	String firstName;
	String lastName;
	LocalDate dob;        
	String aboutAuthor;
	String website;
	String name;
}
