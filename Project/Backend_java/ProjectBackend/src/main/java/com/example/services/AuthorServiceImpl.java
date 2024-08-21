package com.example.services;

import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.AuthorRegisterDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.GraphDataDTO;
import com.example.dto.KeywordAddDTO;
import com.example.dto.ProAuthorDetailsDTO;
import com.example.dto.RecieptDTO;
import com.example.dto.RecieptItemsDTO;
import com.example.dto.SelfAuthorDetailsDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.BookEntity;
import com.example.entities.OrderEntity;
import com.example.entities.ProAuthorEntity;
import com.example.entities.PublisherEntity;
import com.example.entities.SelfAuthorEntity;
import com.example.entities.Status;
import com.example.repositories.AuthorRepositiory;
import com.example.repositories.OrderRepository;
import com.example.repositories.ProAuthorRepositiory;

import lombok.Getter;
import lombok.Setter;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {
	@Autowired
	private AuthorRepositiory repo;
	@Autowired
	private ProAuthorRepositiory proAuthorRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private UserServices userService;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private OrderService orderService;
	@Autowired
	private BookService bookService;
	@Override
	public String registerAuthor(AuthorRegisterDTO user) {
		// TODO Auto-generated method stub
		SelfAuthorEntity author = mapper.map(user, SelfAuthorEntity.class);
		author.setPassword(encoder.encode(author.getPassword()));
		try {
			author.setPhoto(user.getPhoto().getBytes());
			author.setIdentification(user.getIdentification().getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		repo.save(author);
		return "Added successfully";
	}
	@Override
	public SelfAuthorDetailsDTO getAuthorDetails() {
		// TODO Auto-generated method stub
		String email = userService.getUserMail();
		Long id = userService.getUserId(email);
		SelfAuthorEntity author = repo.findById(id).orElseThrow();
		SelfAuthorDetailsDTO authorDTO = mapper.map(author, SelfAuthorDetailsDTO.class);
		return authorDTO;
	}
	private SelfAuthorEntity getAuthorEntityForImages(Long id) {
		SelfAuthorEntity author = repo.findById(id).orElseThrow();
		return author;
	}
	@Override
	public byte[] photoOfAuthor(Long id) {
		
		return getAuthorEntityForImages(id).getPhoto();
	}
	@Override
	public byte[] identificationOfAuthor(Long id) {
		// TODO Auto-generated method stub
		return getAuthorEntityForImages(id).getIdentification();
	}
	@Override
	public List<SelfAuthorDetailsDTO> getPendingAuthors() {
		// TODO Auto-generated method stub
		List<SelfAuthorEntity> pendingAuthorsEntities = repo.getPendingAuthors();
		List<SelfAuthorDetailsDTO> pendingAuthorsDtos = pendingAuthorsEntities.stream().map(ele->mapper.map(ele, SelfAuthorDetailsDTO.class)).collect(Collectors.toList());
		return pendingAuthorsDtos;
	}
	@Override
	public SelfAuthorDetailsDTO updateAuthorDetails(Long id,Status status) {
		SelfAuthorEntity author = repo.findById(id).orElseThrow();
		author.setStatus(status);
		if(status.name().equals("APPROVED")) {
			ProAuthorEntity proAuthor  = mapper.map(author, ProAuthorEntity.class);
			proAuthor.setId(null);
			proAuthorRepo.save(proAuthor);
			
		}
		return mapper.map(author, SelfAuthorDetailsDTO.class);
	}
	@Override
	public ProAuthorDetailsDTO getProAuthorDetails() {
		String email = userService.getUserMail();
		ProAuthorEntity pro = proAuthorRepo.findByEmail(email).orElseThrow();
		return mapper.map(pro, ProAuthorDetailsDTO.class);
	}
	public double getOverallSales(List<OrderEntity> orderList) {
		String email = userService.getUserMail();
		ProAuthorEntity pro = proAuthorRepo.findByEmail(email).orElseThrow();
		Long id = pro.getId();
		List<RecieptDTO> reciepts = orderList.stream().map(order->{
			RecieptDTO reciept = new RecieptDTO();
			reciept.setOrderDate(order.getOrderDate());
			double baseAmt = order.getOrderItems().stream().filter(e->e.getBook().getBookAuthors().stream().findAny().orElseThrow().getAuthor().getId()==id).mapToDouble(ele->ele.getBasePrice()).sum();
			double disAmt = order.getOrderItems().stream().filter(e->e.getBook().getBookAuthors().stream().findAny().orElseThrow().getAuthor().getId()==id).mapToDouble(ele->ele.getBasePrice()*ele.getDiscountPercent()/100).sum();
			double netAmt = baseAmt - disAmt;
			reciept.setNetAmt(netAmt);
			order.getRentItems().stream().forEach(ele->{
				RecieptItemsDTO rtd = new RecieptItemsDTO();
				BookEntity book1 = ele.getBook();
				if(book1.getBookAuthors().stream().findAny().orElseThrow().getAuthor().getId()==id) {
				rtd.setBasePrice(ele.getBook().getRentPerDay());
				rtd.setRentStartDate(ele.getRentStartDate());
				rtd.setRentLastDate(ele.getRentEndDate());
				int days = (int)rtd.getRentStartDate().until(rtd.getRentLastDate(), ChronoUnit.DAYS);
				rtd.setNetPrice(rtd.getBasePrice()*days);
				reciept.setNetAmt(reciept.getNetAmt()+rtd.getNetPrice());
				}
			});
			return reciept;
		}).collect(Collectors.toList());
		return reciepts.stream().reduce(0.0, (partialAgeResult, user) -> partialAgeResult + user.getNetAmt(), Double::sum);
	}
	@Override
	public double getMonthlyOverallSalesForAuthor() {
		LocalDate initial = LocalDate.now();
		LocalDate start = initial.withDayOfMonth(1);
		LocalDate end = initial.with(lastDayOfMonth());
		List <OrderEntity> orderList = orderRepo.getOrderByDates(start, end);
		return getOverallSales(orderList);
	}
	@Override
	public double getDailyOverallSalesForAuthor() {
		String email = userService.getUserMail();
		ProAuthorEntity pro = proAuthorRepo.findByEmail(email).orElseThrow();
		Long id = pro.getId();
		LocalDate date2 = LocalDate.now().plusDays(1);
		LocalDate date1 = LocalDate.now();
		List <OrderEntity> orders = orderRepo.getOrderByDates(date1, date2);
		return getOverallSales(orders);
	}
	@Override
	public UniversalDTO getLast7DaysDataForAuthor() {
		String email = userService.getUserMail();
		ProAuthorEntity pro = proAuthorRepo.findByEmail(email).orElseThrow();
		Long id = pro.getId();
		LocalDate date2 = LocalDate.now().plusDays(1);
		LocalDate date1 = LocalDate.now().minusDays(6);
		List <OrderEntity> orderList = orderRepo.getOrderByDates(date1, date2);
		UniversalDTO udto = new UniversalDTO() {
			@Getter List<UniversalDTO> list1 = orderList.stream().map(order->{
				RecieptDTO reciept = new RecieptDTO();
				reciept.setOrderDate(order.getOrderDate());
				double baseAmt = order.getOrderItems().stream().filter(e->e.getBook().getBookAuthors().stream().findAny().orElseThrow().getAuthor().getId()==id).mapToDouble(ele->ele.getBasePrice()).sum();
				double disAmt = order.getOrderItems().stream().filter(e->e.getBook().getBookAuthors().stream().findAny().orElseThrow().getAuthor().getId()==id).mapToDouble(ele->ele.getBasePrice()*ele.getDiscountPercent()/100).sum();
				double netAmt = baseAmt - disAmt;
				reciept.setNetAmt(netAmt);
				order.getRentItems().stream().forEach(ele->{
					RecieptItemsDTO rtd = new RecieptItemsDTO();
					
					BookEntity book1 = ele.getBook();
					if(book1.getBookAuthors().stream().findAny().orElseThrow().getAuthor().getId()==id) {
					rtd.setBasePrice(ele.getBook().getRentPerDay());
					rtd.setRentStartDate(ele.getRentStartDate());
					rtd.setRentLastDate(ele.getRentEndDate());
					int days = (int)rtd.getRentStartDate().until(rtd.getRentLastDate(), ChronoUnit.DAYS);
					rtd.setNetPrice(rtd.getBasePrice()*days);
					reciept.setNetAmt(reciept.getNetAmt()+rtd.getNetPrice());
					}
				});
				
				 UniversalDTO univ = new UniversalDTO() {
					 @Getter LocalDateTime date = order.getOrderDate();
					 @Getter double sale = reciept.getNetAmt();
				};
				return univ;
			}).collect(Collectors.toList());
			
		};
		return udto;
	}
	@Override
	public List<BookViewDTO> getBooksByAuthor(){
		String email = userService.getUserMail();
		ProAuthorEntity pro2 = proAuthorRepo.findByEmail(email).orElseThrow();
		List<BookEntity> books = proAuthorRepo.getBookByAuthor(pro2.getId());
		List<BookViewDTO> bookViewdtos = books.stream().map(book->{
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
			book1.setReviews(bookService.getReviewsByBook(book.getId()));
			book1.setCategoryName(book.getCategory().getName());
			return book1;
		}).collect(Collectors.toList());
return bookViewdtos;
	}

}
