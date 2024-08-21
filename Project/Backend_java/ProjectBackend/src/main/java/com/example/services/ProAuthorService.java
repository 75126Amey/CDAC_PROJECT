package com.example.services;

import java.util.List;

import com.example.dto.BookSearchViewDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.ProAuthorDetailsDTO;
import com.example.dto.ProAuthorRegisterDTO;

public interface ProAuthorService {

public String registerAuthor(ProAuthorRegisterDTO user);
public ProAuthorDetailsDTO getAuthorDetails(Long id);
public String updateAuthorDetails(ProAuthorDetailsDTO author);
List<BookViewDTO> getBooksByAuthor(Long id);
List<BookSearchViewDTO> get5BooksByAuthor(Long id);
byte[] getImageByAuthor(Long id);
}
