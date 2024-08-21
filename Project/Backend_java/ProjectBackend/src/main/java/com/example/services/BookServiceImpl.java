package com.example.services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.apache.commons.io.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.dto.BookAddDTO;
import com.example.dto.BookApproveViewDTO;
import com.example.dto.BookGetDTO;
import com.example.dto.BookSearchViewDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.KeywordAddDTO;
import com.example.dto.ProAuthorDetailsDTO;
import com.example.dto.ReviewAddDTO;
import com.example.entities.BookAuthorEntity;
import com.example.entities.BookEntity;
import com.example.entities.CategoryEntity;
import com.example.entities.KeywordsEntity;
import com.example.entities.ProAuthorEntity;
import com.example.entities.PublisherEntity;
import com.example.entities.ReviewEntity;
import com.example.entities.Status;
import com.example.repositories.BookAuthorRepository;
import com.example.repositories.BookRepository;
import com.example.repositories.CategoryRepository;
import com.example.repositories.KeywordRepository;
import com.example.repositories.ProAuthorRepositiory;
import com.example.repositories.PublisherRepository;
import com.example.repositories.ReviewRepository;

@Service
@Transactional
public class BookServiceImpl implements BookService {
@Autowired
private KeywordRepository keywordRepo;
@Autowired
private ProAuthorRepositiory authorRepo;
@Autowired
private CategoryRepository categoryRepo;
@Autowired
private PublisherRepository publisherRepo;
@Autowired
private BookRepository bookRepo;
@Autowired
private BookAuthorRepository bookAuthorRepo;
@Autowired
private ModelMapper mapper;
@Autowired
private ReviewRepository reviewRepo;
	@Override
	public String addKeyword(KeywordAddDTO keyword) {
		keywordRepo.save(mapper.map(keyword, KeywordsEntity.class));
		return "Keyword added";
	}
	@Override
	public String addBook(BookAddDTO book){
		try {
		List<KeywordsEntity> keywords = new ArrayList<>();
		if(book.getKeywords()!=null) {
			keywords = keywordRepo.findAllById(book.getKeywords());	
		}
		List<ProAuthorEntity> authors = authorRepo.findAllById(book.getAuthorIds());
		if(authors.size()==0) {
			throw new RuntimeException("INV_AUTH");
		}
		CategoryEntity category = categoryRepo.findById(book.getCategoryId())
				.orElseThrow(()->new RuntimeException("INV_CAT"));
		PublisherEntity publisher = null;
		MultipartFile cover = book.getCoverImage();
		MultipartFile manuscript = book.getManuscript();
		if(book.getPublisherId()!=null) {
			publisher = publisherRepo.findById(book.getPublisherId())
					.orElseThrow(()->new RuntimeException("INV_PUB"));
		}
		if(bookRepo.existsByBookTitle(book.getBookTitle())) {
			throw new RuntimeException("INV_TITLE");
		}
		BookEntity book1 = mapper.map(book, BookEntity.class);
		book1.setRentable(book.getIsRentable());
		book1.setCategory(category);
		book1.setPublisher(publisher);
		book1.getKeywords().addAll(keywords);
		int index = 1;
		for(ProAuthorEntity pro:authors) {
			book1.addAuthors(pro, index);
			index++;
		}
			FileUtils.writeByteArrayToFile(new File("src/main/resources/static/covers/"+cover.getOriginalFilename()),cover.getBytes());
			FileUtils.writeByteArrayToFile(new File("src/main/resources/static/files/"+manuscript.getOriginalFilename()),manuscript.getBytes());
		
		book1.setCoverImage(cover.getOriginalFilename());
		book1.setManuscript(manuscript.getOriginalFilename());
		bookRepo.save(book1);
		return "Book Added";
		}
		catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new RuntimeException(e.getMessage());
			}
	}
	@Override
	public List<BookGetDTO> getBooks() {
		List<BookEntity> bookEntities = bookRepo.findAll();
		List<BookGetDTO> books = bookEntities.stream().map(book->mapper.map(book, BookGetDTO.class)).collect(Collectors.toList());
		return books;
	}
	@Override
	public List<KeywordAddDTO> getKeywords() {
		List<KeywordsEntity> keywordEntities = keywordRepo.findAll();
		List<KeywordAddDTO> keywords = keywordEntities.stream().map(keyword->mapper.map(keyword, KeywordAddDTO.class)).collect(Collectors.toList());
		return keywords;
	}
	@Override
	public List<BookGetDTO> getRecentlyAddedBooks(int pageNo) {
		List<BookEntity> books = bookRepo.recentlyAddedBooks(PageRequest.of(pageNo, 5));
		List<BookGetDTO> booksResponse = books.stream().filter(ele->!ele.getStatus().name().equals("PENDING")).map(book->mapper.map(book,BookGetDTO.class)).collect(Collectors.toList());
		return booksResponse;
	}
	@Override
	public BookViewDTO getBookById(Long id) {
		BookEntity book = bookRepo.findById(id).orElseThrow();
		BookViewDTO book1 = mapper.map(book, BookViewDTO.class);
		List<KeywordAddDTO> keys = book.getKeywords().stream().map(key->mapper.map(key, KeywordAddDTO.class)).collect(Collectors.toList());
		book1.setKeywords(keys);
		book1.setCategoryId(book.getCategory().getId());
		List<ProAuthorDetailsDTO> authorNames  = book.getBookAuthors().stream().map(ele->{
			ProAuthorDetailsDTO pro = new ProAuthorDetailsDTO();
			pro.setName(ele.getAuthor().getFirstName() + " " + ele.getAuthor().getLastName());
			pro.setId(ele.getAuthor().getId());
			return pro;
		}).collect(Collectors.toList());
		book1.setAuthors(authorNames);
		List<ReviewAddDTO> reviews  = getReviewsByBook(id);
		if(reviews.size()>=5) {
			book1.setReviews(reviews.subList(0, 5));
		}
		else {
			book1.setReviews(reviews);
		}
		book1.setCategoryName(book.getCategory().getName());
		book1.setParentCategoryName(book.getCategory().getParent().getName());
		return book1;
	}
	@Override
	public List<ReviewAddDTO> getReviewsByBook(Long bookId) {
		List<ReviewAddDTO> reviewEntities= reviewRepo.getReviewsByBook(bookId).stream().map(review->
		{
			ReviewAddDTO temp1 = mapper.map(review, ReviewAddDTO.class);
			temp1.setCustomerId(review.getCustomer().getId());
			temp1.setCustomerName(review.getCustomer().getFirstName() + " " + review.getCustomer().getLastName());
			return temp1;
		}
		
				)
				.collect(Collectors.toList());
		return reviewEntities;
	}
	@Override
	public BookApproveViewDTO updateBookStatusSelfPublishedDetails(Long id, Status status) {
		BookEntity book = bookRepo.findById(id).orElseThrow();
		book.setStatus(status);
		return mapper.map(book, BookApproveViewDTO.class);
	}
	@Override
	public List<BookApproveViewDTO> getPendingSelfPublishedBooks() {
		// TODO Auto-generated method stub
		List<BookEntity> books = bookRepo.getPendingBooks();
		List<BookApproveViewDTO> booksDTO = new ArrayList<>();
		books.forEach(book->{
			BookApproveViewDTO bookdto = new BookApproveViewDTO();
			bookdto.setTitle(book.getBookTitle());
			bookdto.setCoverImage(book.getCoverImage());
			bookdto.setId(book.getId());
			bookdto.setStatus(book.getStatus());
			bookdto.setManuscript(book.getManuscript());
			String firstName =book.getBookAuthors().stream().findAny().map(ele->ele.getAuthor().getFirstName()).orElseThrow(); 
			String lastName =book.getBookAuthors().stream().findAny().map(ele->ele.getAuthor().getLastName()).orElseThrow(); 
			bookdto.setAuthor(firstName + " " +lastName);
			booksDTO.add(bookdto);
		});
		return booksDTO;
	}
	@Override
	public List<BookSearchViewDTO> getBooksBySearchKeyword(String name) {
		List<BookEntity> bookEntities = keywordRepo.getBooksByKeyWord(name);
		return bookEntities.stream().map(ele->{
			BookSearchViewDTO temp =   mapper.map(ele, BookSearchViewDTO.class);
			temp.setCategoryName(ele.getCategory().getName());
			if(ele.getPublisher()!=null) {
				temp.setPublisherName(ele.getPublisher().getName());
				}
			List<String> authorNames  = ele.getBookAuthors().stream().map(ele2->{
				return ele2.getAuthor().getFirstName() + " " + ele2.getAuthor().getLastName();
			}).collect(Collectors.toList());
			temp.setAuthors(authorNames);	
			return temp;
		}).collect(Collectors.toList());
	}
	@Override
	public List<BookSearchViewDTO> getBooksBySearchTerm(String name){
		List<BookEntity> bookResultsByKeyword = keywordRepo.getBooksByKeyWord(name);
		List<BookEntity> bookResultsByCategory = categoryRepo.getBooksByAnyCategory(name);
		List<BookEntity> bookResultsByBookTerm = bookRepo.getBookByTerm(name);
		Set<BookEntity> bookOverallResultsEntities = new HashSet<>();
		bookOverallResultsEntities.addAll(bookResultsByKeyword);
		bookOverallResultsEntities.addAll(bookResultsByCategory);
		bookOverallResultsEntities.addAll(bookResultsByBookTerm);
		
		return bookOverallResultsEntities.stream().map(ele->{
			BookSearchViewDTO temp =   mapper.map(ele, BookSearchViewDTO.class);
			temp.setCategoryName(ele.getCategory().getName());
			if(ele.getPublisher()!=null) {
				temp.setPublisherName(ele.getPublisher().getName());
				}
			List<String> authorNames  = ele.getBookAuthors().stream().map(ele2->{
				return ele2.getAuthor().getFirstName() + " " + ele2.getAuthor().getLastName();
			}).collect(Collectors.toList());
			temp.setAuthors(authorNames);	
			return temp;
		}).collect(Collectors.toList());
	}
	@Override
	public List<BookGetDTO> getTrendingBooks(int pageNo) {
		List<BookEntity> books = bookRepo.trendingBooks(PageRequest.of(pageNo, 5));
		List<BookGetDTO> booksResponse = books.stream().filter(ele->!ele.getStatus().name().equals("PENDING")).map(book->mapper.map(book,BookGetDTO.class)).collect(Collectors.toList());
		return booksResponse;
	}
	
	
}
