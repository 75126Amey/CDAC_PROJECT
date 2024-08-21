package com.example.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.example.entities.Status;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class BookSearchViewDTO {
	Long id;
	private String bookTitle;
	private String bookSubtitle;
	double basePrice;
	boolean isRentable;
	String shortDesc;
	String publisherName;
	String coverImage;
	int pages;
	List<String> authors;
	Double rentPerDay;
	String categoryName;
}
