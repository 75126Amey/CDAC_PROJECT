package com.example.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="user")
public class UserEntity {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
Long id;
String email;
String password;
@Enumerated(value = EnumType.STRING)
Role role;
@CreationTimestamp
LocalDateTime createdAt;
String photo;
String identification;
}
