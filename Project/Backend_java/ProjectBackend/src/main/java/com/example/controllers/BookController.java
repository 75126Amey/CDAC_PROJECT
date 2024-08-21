package com.example.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.BookAddDTO;
import com.example.dto.BookApproveViewDTO;
import com.example.dto.BookGetDTO;
import com.example.dto.BookSearchViewDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.CategoryGetDTO;
import com.example.dto.KeywordAddDTO;
import com.example.dto.ReviewAddDTO;
import com.example.dto.SelfAuthorDetailsDTO;
import com.example.entities.Status;
import com.example.response.ApiResponseSuccess;
import com.example.services.BookService;




@RestController
@RequestMapping("/book")
@CrossOrigin
@Validated
public class BookController {
@Autowired
private BookService bookService;
@PostMapping("/keyword/add")
public ResponseEntity<?> addKeyword(@RequestBody KeywordAddDTO keyword){
ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
response.setData(bookService.addKeyword(keyword));
return ResponseEntity.ok(response);
}
@PostMapping("/add")
public ResponseEntity<?> addBook(@ModelAttribute BookAddDTO book){
	ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
	response.setData(bookService.addBook(book));
	return ResponseEntity.ok(response);
}
@GetMapping("/page/{pageNo}")
public ResponseEntity<?> getAllRecentBooks(@PathVariable int pageNo){
	ApiResponseSuccess<List<BookGetDTO>> response = new ApiResponseSuccess<>();
	response.setData(bookService.getRecentlyAddedBooks(pageNo));
	return ResponseEntity.ok(response);

}
@GetMapping("/page/trending/{pageNo}")
public ResponseEntity<?> getAllTrendingBooks(@PathVariable int pageNo){
	ApiResponseSuccess<List<BookGetDTO>> response = new ApiResponseSuccess<>();
	response.setData(bookService.getTrendingBooks(pageNo));
	return ResponseEntity.ok(response);

}
@GetMapping("/{id}")
public ResponseEntity<?> getBookById(@PathVariable Long id){
	ApiResponseSuccess<BookViewDTO> response = new ApiResponseSuccess<>();
	response.setData(bookService.getBookById(id));
	return ResponseEntity.ok(response);

}
@GetMapping("/keyword")
public ResponseEntity<?> getAllKeywords(){
	ApiResponseSuccess<List<KeywordAddDTO>> response = new ApiResponseSuccess<>();
	response.setData(bookService.getKeywords());
	return ResponseEntity.ok(response);

}
@GetMapping("/review/{bookId}")
public ResponseEntity<?> getReviewsByBook(@PathVariable Long bookId){
	ApiResponseSuccess<List<ReviewAddDTO>> response = new ApiResponseSuccess<>();
	response.setData(bookService.getReviewsByBook(bookId));
	return ResponseEntity.ok(response);

}
@PatchMapping("/status/{id}")
public ResponseEntity<?> updateSelfPublishedBookStatus(@RequestParam(required = false) Status status,@PathVariable Long id){
	ApiResponseSuccess<BookApproveViewDTO> response = new ApiResponseSuccess<>();
	response.setData(bookService.updateBookStatusSelfPublishedDetails(id, status));
	return ResponseEntity.ok(response);
	
}
@GetMapping("/pending")
public ResponseEntity<?> getPendingBooks(){
	ApiResponseSuccess<List<BookApproveViewDTO>> response = new ApiResponseSuccess<>();
	response.setData(bookService.getPendingSelfPublishedBooks());
	return ResponseEntity.ok(response);	
}
@GetMapping("/search/keyword/{name}")
public ResponseEntity<?> getSearchResultsByKeyword(@PathVariable String name){
	ApiResponseSuccess<List<BookSearchViewDTO>> response = new ApiResponseSuccess<>();
	response.setData(bookService.getBooksBySearchKeyword(name));
	return ResponseEntity.ok(response);	
}
@GetMapping("/search")
public ResponseEntity<?> getSearchResultsBySearchTerm(@RequestParam String term){
	ApiResponseSuccess<List<BookSearchViewDTO>> response = new ApiResponseSuccess<>();
	response.setData(bookService.getBooksBySearchTerm(term));
	return ResponseEntity.ok(response);	
}
}
