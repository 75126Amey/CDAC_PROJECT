package com.example.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.GenerateOtpDTO;
import com.example.dto.OrderAddDTO;
import com.example.dto.RecieptDTO;
import com.example.dto.RecieptItemsDTO;
import com.example.dto.RentItemDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.BookEntity;
import com.example.entities.CustomerEntity;
import com.example.entities.OrderEntity;
import com.example.entities.OrderItemEntity;
import com.example.entities.OrderStatus;
import com.example.entities.PaymentEntity;
import com.example.entities.RentEntity;
import com.example.exception.exceptions.InvalidCardDetailsException;
import com.example.exception.exceptions.UniqueConstraintViolationException;
import com.example.repositories.BookRepository;
import com.example.repositories.CustomerRepository;
import com.example.repositories.OrderRepository;
import com.example.repositories.PaymentRepo;
import com.example.repositories.RentItemRepositiory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Service
@Transactional
public class OrderServiceImpl implements OrderService{
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private RentItemRepositiory rentRepo;
	@Autowired
	private BookRepository bookRepo;
	@Autowired
	private CustomerRepository customerRepo;
	@Autowired
	private UserServices userServices;
	@Value("${CARD_1}")
	private String storedCardNo;
	@Value("${UPI_1}")
	private String storedUpiNo;
	@Autowired
	private emailService emailService;
	@Autowired
	private PaymentRepo payRepo;
	@Override
	public UniversalDTO placeOrder(OrderAddDTO orderDto) {
		CustomerEntity customer  = customerRepo.findById(userServices.
				getUserId(userServices.getUserMail())).orElseThrow();
		if((orderDto.getItemIds().size()==0)&&(orderDto.getRentItems().size()==0))
			throw new RuntimeException( "Order emoty");
		List<OrderItemEntity> orderItemsForIds = orderRepo.bookIdsofBooksPurchasedByCustomer(customer.getEmail()); 
		List<RentEntity> rentItemsForIds = rentRepo.bookIdsofBooksRentedByCustomer(customer.getEmail());
		List<Long> bookIdsFromCustomer = orderItemsForIds.stream().map(ele->ele.getBook().getId()).collect(Collectors.toList());
		List<Long> bookIdsRentedFromCustomer = rentItemsForIds.stream().map(ele->ele.getBook().getId()).collect(Collectors.toList());
		bookIdsFromCustomer.addAll(bookIdsRentedFromCustomer);
		orderDto.getItemIds().forEach(item->{
			if(bookIdsFromCustomer.contains(item))
				throw new RuntimeException( "Order rejected because of dupilcat elements");
		});
		orderDto.getRentItems().forEach(item->{
			if(bookIdsFromCustomer.contains(item.getId()))
				throw new RuntimeException( "Order rejected because of dupilcate elements");
		});
		OrderEntity order = new OrderEntity();
		String orderNo = new java.math.BigInteger(336,new Random()).toString().substring(0,18);
		order.setOrderNo(orderNo);
		order.setOrderDate(LocalDateTime.now());
		order.setCustomer(customer);
		List<BookEntity> items = bookRepo.findAllById(orderDto.getItemIds());
		items.forEach(item->{
			if((item.getCategory().getParent().getName().equals("Educational")
					&&((customer.getProfession().name().equals("TEACHER")||
							(customer.getProfession().name().equals("STUDENT")))))){
				order.addItems(item, item.getBasePrice(), 10.5);
			}
			else {
				order.addItems(item, item.getBasePrice(), 0);
			}
		});
		if(orderDto.getRentItems()!=null) {
		orderDto.getRentItems().forEach(item->{
			BookEntity book = bookRepo.findById(item.getId()).orElseThrow();
			order.addRentItems(book,book.getRentPerDay(), item.getRentLastDate());
		});
		}
		order.setOrderStatus(OrderStatus.PENDING);
		double totalSales = 0;
		for(OrderItemEntity buyItem:order.getOrderItems()) {
			totalSales+=buyItem.getBasePrice()*(1-(buyItem.getDiscountPercent())/100);
		}
		for(RentEntity rentItem:order.getRentItems()) {
			int days = (int)rentItem.getRentStartDate().until(rentItem.getRentEndDate(), ChronoUnit.DAYS);
			totalSales+=rentItem.getRentPerDay()*days;
		}
		PaymentEntity pay = new PaymentEntity();
		pay.setAmount(totalSales);
		String transNo = new java.math.BigInteger(336,new Random()).toString().substring(0,7);
		pay.setTransactionNo("TXN"+transNo);
		order.setPayment(pay);
		Long orderId  = orderRepo.save(order).getId();
		String orderNoForResponse = order.getOrderNo();
		double amtforRepsonse = pay.getAmount();
		return new UniversalDTO() {
		@Getter Long id = orderId;
		@Getter String orderNo = orderNoForResponse;
		@Getter double amount  = amtforRepsonse;
		};
		
	}
	@Override
	public RecieptDTO getOrder(Long id) {
		OrderEntity order = orderRepo.findById(id).orElseThrow();
		CustomerEntity customer = order.getCustomer();
		RecieptDTO reciept = new RecieptDTO();
		reciept.setCustomerName(customer.getFirstName() + " " +customer.getLastName());
		reciept.setOrderDate(order.getOrderDate());
		reciept.setOrderStatus(order.getOrderStatus());
		double baseAmt = order.getOrderItems().stream().mapToDouble(ele->ele.getBasePrice()).sum();
		double disAmt = order.getOrderItems().stream().mapToDouble(ele->ele.getBasePrice()*ele.getDiscountPercent()/100).sum();
		double netAmt = baseAmt - disAmt;
		reciept.setBaseAmt(baseAmt);
		reciept.setDiscountAmt(disAmt);
		reciept.setNetAmt(netAmt);
		reciept.setOrderNo(order.getOrderNo());
		if(order.getPayment()!=null) {
			reciept.setTransactionNo(order.getPayment().getTransactionNo());
		}
		List<RecieptItemsDTO> recieptItems = order.getOrderItems().stream().map(ele->{
			RecieptItemsDTO rtd = new RecieptItemsDTO();
			BookEntity book1 = ele.getBook();
			rtd.setBookTitle(book1.getBookTitle());
			rtd.setCoverImage(book1.getCoverImage());
			rtd.setBasePrice(ele.getBasePrice());
			rtd.setDiscountPrice(ele.getBasePrice()*ele.getDiscountPercent()/100);
			rtd.setNetPrice(rtd.getBasePrice()-rtd.getDiscountPrice());
			return rtd;
		}).collect(Collectors.toList());
		List<RecieptItemsDTO> rentItems = order.getRentItems().stream().map(ele->{
			RecieptItemsDTO rtd = new RecieptItemsDTO();
			BookEntity book1 = ele.getBook();
			rtd.setBookTitle(book1.getBookTitle());
			rtd.setCoverImage(book1.getCoverImage());
			rtd.setBasePrice(ele.getBook().getRentPerDay());
			rtd.setRentStartDate(ele.getRentStartDate());
			rtd.setRentLastDate(ele.getRentEndDate());
			int days = (int)rtd.getRentStartDate().until(rtd.getRentLastDate(), ChronoUnit.DAYS);
			rtd.setNoOfDaysRented(days);
			rtd.setNetPrice(rtd.getBasePrice()*days);
			reciept.setBaseAmt(reciept.getBaseAmt()+rtd.getNetPrice());
			reciept.setNetAmt(reciept.getNetAmt()+rtd.getNetPrice());
			return rtd;
		}).collect(Collectors.toList());
		reciept.setOrderItems(recieptItems);
		reciept.setRentItems(rentItems);
			return reciept;
		}
	
	@Override
	public UniversalDTO getLast7DaysData(List<OrderEntity> orderList) {
		LocalDate date2 = LocalDate.now().plusDays(1);
		LocalDate date1 = LocalDate.now().minusDays(6);
		UniversalDTO udto = new UniversalDTO() {
			@Getter List<UniversalDTO> list1 = orderList.stream().map(order->{
				RecieptDTO reciept = new RecieptDTO();
				reciept.setOrderDate(order.getOrderDate());
				double baseAmt = order.getOrderItems().stream().mapToDouble(ele->ele.getBasePrice()).sum();
				double disAmt = order.getOrderItems().stream().mapToDouble(ele->ele.getBasePrice()*ele.getDiscountPercent()/100).sum();
				double netAmt = baseAmt - disAmt;
				reciept.setNetAmt(netAmt);
				order.getRentItems().stream().forEach(ele->{
					RecieptItemsDTO rtd = new RecieptItemsDTO();
					BookEntity book1 = ele.getBook();
					rtd.setBasePrice(ele.getBook().getRentPerDay());
					rtd.setRentStartDate(ele.getRentStartDate());
					rtd.setRentLastDate(ele.getRentEndDate());
					int days = (int)rtd.getRentStartDate().until(rtd.getRentLastDate(), ChronoUnit.DAYS);
					rtd.setNetPrice(rtd.getBasePrice()*days);
					reciept.setNetAmt(reciept.getNetAmt()+rtd.getNetPrice());
				});
				UniversalDTO univ = new UniversalDTO() {
					@Setter	@Getter LocalDateTime date = order.getOrderDate();
					@Setter @Getter double sale = reciept.getNetAmt();
				};
				return univ;
			}).collect(Collectors.toList());
			
		};
		return udto;
	}
	
	@Override
	public double getDailyOverallSales(List<OrderEntity> orderList) {
		List<RecieptDTO> reciepts = orderList.stream().map(order->{
			RecieptDTO reciept = new RecieptDTO();
			reciept.setOrderDate(order.getOrderDate());
			double baseAmt = order.getOrderItems().stream().mapToDouble(ele->ele.getBasePrice()).sum();
			double disAmt = order.getOrderItems().stream().mapToDouble(ele->ele.getBasePrice()*ele.getDiscountPercent()/100).sum();
			double netAmt = baseAmt - disAmt;
			reciept.setNetAmt(netAmt);
			order.getRentItems().stream().forEach(ele->{
				RecieptItemsDTO rtd = new RecieptItemsDTO();
				BookEntity book1 = ele.getBook();
				rtd.setBasePrice(ele.getBook().getRentPerDay());
				rtd.setRentStartDate(ele.getRentStartDate());
				rtd.setRentLastDate(ele.getRentEndDate());
				int days = (int)rtd.getRentStartDate().until(rtd.getRentLastDate(), ChronoUnit.DAYS);
				rtd.setNetPrice(rtd.getBasePrice()*days);
				reciept.setNetAmt(reciept.getNetAmt()+rtd.getNetPrice());
			});
			return reciept;
		}).collect(Collectors.toList());
		return reciepts.stream().reduce(0.0, (partialAgeResult, user) -> partialAgeResult + user.getNetAmt(), Double::sum);
	}
	
	@Override
	public UniversalDTO getLast7DaysDataForAdmin() {
		LocalDate date2 = LocalDate.now().plusDays(1);
		LocalDate date1 = LocalDate.now().minusDays(6);
		List<OrderEntity> orderEntities = orderRepo.getOrderByDates(date1, date2);
		// TODO Auto-generated method stub
		return getLast7DaysData(orderEntities);
	}
	
	@Override
	public double getMonthlyOverallSalesForAdmin() {
		LocalDate initial = LocalDate.now();
		LocalDate start = initial.withDayOfMonth(1);
		LocalDate end = initial.with(lastDayOfMonth());
		List <OrderEntity> orders = orderRepo.getOrderByDates(start, end);
		return getDailyOverallSales(orders);
	}
	
	@Override
	public double getDailyOverallSalesForAdmin() {
		LocalDate date2 = LocalDate.now().plusDays(1);
		LocalDate date1 = LocalDate.now();
		List<OrderEntity> orderEntities = orderRepo.getOrderByDates(date1, date2);
		return getDailyOverallSales(orderEntities);
	}
	@Override
	public UniversalDTO generateOTP(GenerateOtpDTO dto) {
		OrderEntity order = orderRepo.findById(dto.getOrderId()).orElseThrow();
		if(dto.getCardNo().equals(storedCardNo)||dto.getCardNo().equals(storedUpiNo)) {
			Long otp = Long.parseLong(new java.math.BigInteger(336,new Random()).toString().substring(0,4));
			order.getPayment().setOtp(otp);
			emailService.sendEmail("vaishak.rk99@gmail.com","OTP", otp+"");
			return new UniversalDTO() {
			@Getter Long id = order.getId();
			@Getter String status = "success";
			};
		}else {
			order.setOrderStatus(OrderStatus.FAILED);
			return new UniversalDTO() {
				@Getter String status = "error";
				@Getter Long id = order.getId();
				};
		}
	}
	
	@Override
	public Long validateOTP(Long otp,Long id) {
		OrderEntity order = orderRepo.findById(id).orElseThrow();
		if(order.getPayment().getOtp().equals(otp)) {
			order.setOrderStatus(OrderStatus.SUCCESS);
			return order.getId();
		}else {
			order.setOrderStatus(OrderStatus.FAILED);
			return order.getId();
		}
	}
	}


