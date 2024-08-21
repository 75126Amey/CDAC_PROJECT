package com.example.dto;


import com.example.entities.Role;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterDTO {
	String email;
	String password;
	Role role;
}
