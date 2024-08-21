package com.example.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecieptItemsDTO {
private String bookTitle;
private String coverImage;
private Double basePrice;
private Double discountPrice;
private Double netPrice;
private LocalDateTime rentStartDate;
private LocalDateTime rentLastDate;
private Integer noOfDaysRented;
}
