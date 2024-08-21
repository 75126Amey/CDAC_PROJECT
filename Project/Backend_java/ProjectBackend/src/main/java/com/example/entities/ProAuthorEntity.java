package com.example.entities;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="author")
@EqualsAndHashCode(onlyExplicitlyIncluded = true,callSuper = false)
public class ProAuthorEntity extends BaseEntity{
@Column(unique = true)
String email;
@EqualsAndHashCode.Include
String firstName;
@EqualsAndHashCode.Include
String lastName;
LocalDate dob;        
@Column(columnDefinition="mediumblob")
byte[] photo;
@Column(length = 2000)
String aboutAuthor;
@Column(length = 100)
String website;
}
