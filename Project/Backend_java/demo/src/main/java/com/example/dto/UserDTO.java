package com.example.dto;



import org.springframework.web.multipart.MultipartFile;

import com.example.entities.Role;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
	String email;
	String password;
	Role role;
	MultipartFile photo;
	MultipartFile identification;
}
