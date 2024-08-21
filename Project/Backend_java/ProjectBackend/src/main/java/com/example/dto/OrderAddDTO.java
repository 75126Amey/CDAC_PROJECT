package com.example.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class OrderAddDTO {
private List<Long> itemIds;
private List<RentItemDTO> rentItems;
}
