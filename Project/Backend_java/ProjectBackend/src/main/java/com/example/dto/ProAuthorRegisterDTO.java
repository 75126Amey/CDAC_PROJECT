package com.example.dto;

import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProAuthorRegisterDTO{
String email;
String firstName;
String lastName;
LocalDate dob;        
MultipartFile photo;
String aboutAuthor;
String website;
}
