package com.example.dto;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.entities.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignInDTO {
	String email;
	String password;
	Role role;
}
