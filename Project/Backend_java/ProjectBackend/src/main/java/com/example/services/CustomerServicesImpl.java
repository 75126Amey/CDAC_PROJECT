package com.example.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.type.descriptor.java.BooleanJavaType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.CustomerRegisterDTO;
import com.example.dto.LibraryViewDTO;
import com.example.dto.OrderGetDTO;
import com.example.dto.ReviewAddDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.BookEntity;
import com.example.entities.CustomerEntity;
import com.example.entities.OrderEntity;
import com.example.entities.OrderItemEntity;
import com.example.entities.RentEntity;
import com.example.entities.ReviewEntity;
import com.example.repositories.BookRepository;
import com.example.repositories.CustomerRepository;
import com.example.repositories.OrderRepository;
import com.example.repositories.RentItemRepositiory;
import com.example.repositories.ReviewRepository;

import lombok.Getter;
import lombok.Setter;

@Service
@Transactional
public class CustomerServicesImpl implements CustomerServices{
	@Autowired
	private CustomerRepository customerRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private UserServices userService;
	@Autowired
	private BookRepository bookRepo;
	@Autowired
	private ReviewRepository reviewRepo;
	@Autowired
	private RentItemRepositiory rentRepo;
	@Override
	public String registerCustomer(CustomerRegisterDTO user) {
		CustomerEntity user1 = mapper.map(user, CustomerEntity.class);
		user1.setPassword(encoder.encode(user1.getPassword()));
		customerRepo.save(user1);
		return "Customer added";
	}
	@Override
	public List<Long> getBookIdByCustomer() {
		String email = userService.getUserMail();
		List<OrderItemEntity> orderItems = orderRepo.bookIdsofBooksPurchasedByCustomer(email); 
		List<Long> bookIds = orderItems.stream().map(ele->ele.getBook().getId()).collect(Collectors.toList());
		return bookIds;
	}
	
	@Override
	public List<Long> getBookRentedIdByCustomer() {
		String email = userService.getUserMail();
		List<RentEntity> orderItems = rentRepo.bookIdsofBooksRentedByCustomer(email); 
		List<Long> bookIds = orderItems.stream().map(ele->ele.getBook().getId()).collect(Collectors.toList());
		return bookIds;
	}
	@Override
	public String addReview(ReviewAddDTO reviewDto) {
		CustomerEntity customer = customerRepo.findById(userService
				.getUserId(userService.getUserMail())).orElseThrow();
		if(getReviewableBookIdsByCustomer().contains(reviewDto.getBookId())) {
		ReviewEntity review = mapper.map(reviewDto, ReviewEntity.class);
		review.setCustomer(customer);
		review.setBook(bookRepo.findById(reviewDto.getBookId()).orElseThrow());
		reviewRepo.save(review);
		return "Comment added successfully";
		}
		else {
			return "comment unsucessfull";
		}
	}
	@Override
	public String updateReview(ReviewAddDTO reviewDto) {
		ReviewEntity review = reviewRepo.findById(reviewDto.getId()).orElseThrow();
		review.setComment(reviewDto.getComment());
		review.setRating(reviewDto.getRating());
		return "comment updated";
	}
	@Override
	public List<Long> getReviewableBookIdsByCustomer() {
		Set<Long> bookIdsReviewableByCustomer = new HashSet<Long>();
		
		List<Long> bookIdsPurchasedByCustomer = getBookIdByCustomer();
		List<Long> bookIdsRentedFromCustomer = rentRepo.bookIdsofBooksRentedByCustomerForReview(userService.getUserMail()).
				stream().map(ele->ele.getBook().getId()).collect(Collectors.toList());
		
		bookIdsReviewableByCustomer.addAll(bookIdsRentedFromCustomer);
		bookIdsReviewableByCustomer.addAll(bookIdsPurchasedByCustomer);
		return new ArrayList<>(bookIdsReviewableByCustomer);
	}
	@Override

	public List<LibraryViewDTO> getBooksForLibrary(){
		List<Long> bookIdsPurchasedByCustomer = getBookIdByCustomer();
		List<BookEntity> purchasedBooks = bookRepo.findAllById(bookIdsPurchasedByCustomer);
		List<RentEntity> rentedBooks = rentRepo.bookIdsofBooksRentedByCustomer(userService.getUserMail());
		List<LibraryViewDTO> libraryBooks = new ArrayList<LibraryViewDTO>();
		purchasedBooks.forEach(book->{
			LibraryViewDTO book1 = new LibraryViewDTO();
			book1.setCoverImage(book.getCoverImage());
			book1.setManuscript(book.getManuscript());
			book1.setId(book.getId());
			book1.setBookTitle(book.getBookTitle());
			libraryBooks.add(book1);
		});
		rentedBooks.forEach(rentedBook->{
			LibraryViewDTO book1 = new LibraryViewDTO();
			book1.setCoverImage(rentedBook.getBook().getCoverImage());
			book1.setManuscript(rentedBook.getBook().getManuscript());
			book1.setId(rentedBook.getBook().getId());
			book1.setIsRentable(true);
			book1.setRentEndDate(rentedBook.getRentEndDate());
			book1.setBookTitle(rentedBook.getBook().getBookTitle());
			libraryBooks.add(book1);
		});
		return libraryBooks;
	}
	@Override
	public UniversalDTO getCustomerName() {
		Long id = userService.getUserId();
		CustomerEntity entity = customerRepo.findById(id).orElseThrow(); 
		return new UniversalDTO() {
			@Getter String firstName = entity.getFirstName();
			@Getter String LastName = entity.getLastName();
		};
		
	}
	@Override
	public List<OrderGetDTO> getCustomerOrders() {
		List<OrderEntity> orders = orderRepo.orderIdsOfCustomer(userService.getUserId());
		List<OrderGetDTO> orderDTO = orders.stream().map(order->{
			OrderGetDTO temp = new OrderGetDTO();
			temp.setId(order.getId());
			temp.setDate(order.getOrderDate());
			temp.setOrderNo(order.getOrderNo());
			temp.setStatus(order.getOrderStatus());
			return temp;
		}).collect(Collectors.toList());
		return orderDTO;
	}
	@Override
	public String customerOccupation() {
		Long id = userService.getUserId();
		CustomerEntity entity = customerRepo.findById(id).orElseThrow();
		return entity.getProfession().name();
	}
}
