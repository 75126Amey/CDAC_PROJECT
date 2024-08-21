package com.example.services;

import java.io.IOException;
import java.util.List;

import com.example.dto.BookAddDTO;
import com.example.dto.BookApproveViewDTO;
import com.example.dto.BookGetDTO;
import com.example.dto.BookSearchViewDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.KeywordAddDTO;
import com.example.dto.ReviewAddDTO;
import com.example.dto.SelfAuthorDetailsDTO;
import com.example.entities.Status;

public interface BookService {

public String addKeyword(KeywordAddDTO keyword);
public String addBook(BookAddDTO book);
public List<BookGetDTO> getBooks();
public List<KeywordAddDTO> getKeywords();
public List<BookGetDTO> getRecentlyAddedBooks(int pageNo);
public List<BookGetDTO> getTrendingBooks(int pageNo);
public BookViewDTO getBookById(Long id);
public List<ReviewAddDTO> getReviewsByBook(Long bookId);
public BookApproveViewDTO updateBookStatusSelfPublishedDetails(Long id,Status status);
public List<BookApproveViewDTO> getPendingSelfPublishedBooks();
List<BookSearchViewDTO> getBooksBySearchKeyword(String name);
List<BookSearchViewDTO> getBooksBySearchTerm(String name);
}
