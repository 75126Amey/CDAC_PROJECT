package com.example.entities;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name="customer")
public class CustomerEntity extends UserEntity{
String firstName;
String lastName;
@Column(length = 20)
String phoneNo; 
LocalDate dob;        
@Enumerated(EnumType.STRING)
Profession profession; 
double balance;  
}
