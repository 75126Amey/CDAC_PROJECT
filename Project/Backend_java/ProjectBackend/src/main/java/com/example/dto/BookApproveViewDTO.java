package com.example.dto;

import com.example.entities.Status;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookApproveViewDTO {
private Long id;
private String title;
private String author;
private String coverImage;
private String manuscript;
private Status status;
}
