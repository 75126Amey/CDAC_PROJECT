package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.dto.CustomerRegisterDTO;
import com.example.dto.LibraryViewDTO;
import com.example.dto.OrderGetDTO;
import com.example.dto.ReviewAddDTO;
import com.example.dto.UniversalDTO;

public interface CustomerServices {

public String registerCustomer(CustomerRegisterDTO user);
public List<Long> getBookIdByCustomer();
public String addReview(ReviewAddDTO reviewDto);
public String updateReview(ReviewAddDTO reviewDto);
List<Long> getBookRentedIdByCustomer();
List<Long> getReviewableBookIdsByCustomer();
List<LibraryViewDTO> getBooksForLibrary();
UniversalDTO getCustomerName();
List<OrderGetDTO> getCustomerOrders();
String customerOccupation();
}
