package com.example.dto;



import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.entities.Role;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Test1DTO {
	String name;
	List<Long> nums=new ArrayList<>();
}
