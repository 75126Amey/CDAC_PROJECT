package com.example.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LibraryViewDTO {
Long id;
private String coverImage;
private String bookTitle;
private String manuscript;
private Boolean isRentable;
private LocalDateTime rentEndDate;
}
