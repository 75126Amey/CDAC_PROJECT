package com.example.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RentItemDTO {
private LocalDateTime rentLastDate;
private Long id;
}
