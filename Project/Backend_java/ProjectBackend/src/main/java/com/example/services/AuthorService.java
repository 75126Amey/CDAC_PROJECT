package com.example.services;

import java.util.List;

import com.example.dto.AuthorRegisterDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.ProAuthorDetailsDTO;
import com.example.dto.SelfAuthorDetailsDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.Status;

public interface AuthorService {

public String registerAuthor(AuthorRegisterDTO user);
public SelfAuthorDetailsDTO getAuthorDetails();
public byte[] photoOfAuthor(Long id);
public byte[] identificationOfAuthor(Long id);
public List<SelfAuthorDetailsDTO> getPendingAuthors();
public SelfAuthorDetailsDTO updateAuthorDetails(Long id,Status status);
public ProAuthorDetailsDTO getProAuthorDetails();
double getMonthlyOverallSalesForAuthor();
double getDailyOverallSalesForAuthor();
UniversalDTO getLast7DaysDataForAuthor();
public List<BookViewDTO> getBooksByAuthor();
}
