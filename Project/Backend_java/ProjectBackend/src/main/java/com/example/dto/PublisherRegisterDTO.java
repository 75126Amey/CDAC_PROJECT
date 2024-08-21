package com.example.dto;


import com.example.entities.Role;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PublisherRegisterDTO {
	@Email
	String email;
	String password;
	Role role=Role.valueOf("PUBLISHER");
	String name;
	String description;
	String phoneNo;
}
