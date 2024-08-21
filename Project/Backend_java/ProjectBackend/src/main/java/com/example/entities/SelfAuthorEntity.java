package com.example.entities;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="self_author")
@EqualsAndHashCode(callSuper = true)
public class SelfAuthorEntity extends UserEntity{
String firstName;
String lastName;
@Column(length = 20)
String phoneNo; 
LocalDate dob;        
@Lob
@Column(columnDefinition="mediumblob")
byte[] photo;
@Lob
@Column(columnDefinition="mediumblob")
byte[] identification;
@Column(length = 20)
String bankAccountNo;
@Column(length = 20)
String ifscCode;
@Enumerated(EnumType.STRING)
Status status=Status.valueOf("PENDING");
}
