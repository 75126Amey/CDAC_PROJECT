package com.example.services;

import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

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

import com.example.dto.PublisherRegisterDTO;
import com.example.dto.RecieptDTO;
import com.example.dto.RecieptItemsDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.BookEntity;
import com.example.entities.OrderEntity;
import com.example.entities.ProAuthorEntity;
import com.example.entities.PublisherEntity;
import com.example.repositories.OrderRepository;
import com.example.repositories.PublisherRepository;

import lombok.Getter;

@Service
@Transactional
public class PublisherServicesImpl implements PublisherService {
	@Autowired
	PublisherRepository publisherRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserServices userService;
	@Override
	public String registerPublisher(PublisherRegisterDTO user) {
		
		PublisherEntity publisher = mapper.map(user, PublisherEntity.class);
		publisher.setPassword(encoder.encode(user.getPassword()));
		publisherRepo.save(publisher);
		return "Publisher added";
	}
	public double getOverallSales(List<OrderEntity> orderList) {
		PublisherEntity publisher = publisherRepo.findById(userService.getUserId()).orElseThrow();
		Long id = publisher.getId();
		List<RecieptDTO> reciepts = orderList.stream().map(order->{
			RecieptDTO reciept = new RecieptDTO();
			reciept.setOrderDate(order.getOrderDate());
			double baseAmt = order.getOrderItems().stream().filter(e->e.getBook().getPublisher()!=null&&e.getBook().getPublisher().getId()==id).mapToDouble(ele->ele.getBasePrice()).sum();
			double disAmt = order.getOrderItems().stream().filter(e->e.getBook().getPublisher()!=null&&e.getBook().getPublisher().getId()==id).mapToDouble(ele->ele.getBasePrice()*ele.getDiscountPercent()/100).sum();
			double netAmt = baseAmt - disAmt;
			reciept.setNetAmt(netAmt);
			order.getRentItems().stream().forEach(ele->{
				RecieptItemsDTO rtd = new RecieptItemsDTO();
				BookEntity book1 = ele.getBook();
				if(book1.getPublisher()!=null&&book1.getPublisher().getId()==id) {
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
	public double getMonthlyOverallSalesForPublisher() {
		LocalDate initial = LocalDate.now();
		LocalDate start = initial.withDayOfMonth(1);
		LocalDate end = initial.with(lastDayOfMonth());
		List<OrderEntity> orders = orderRepo.getOrderByDates(start, end);
		return getOverallSales(orders);
		
	}
	@Override
	public double getDailyOverallSalesForPublisher() {
		LocalDate date2 = LocalDate.now().plusDays(1);
		LocalDate date1 = LocalDate.now();
		List <OrderEntity> orders = orderRepo.getOrderByDates(date1, date2);
		return getOverallSales(orders);
	}
	@Override
	public UniversalDTO getLast7DaysDataForPublisher() {
		PublisherEntity publisher = publisherRepo.findById(userService.getUserId()).orElseThrow();
		Long id = publisher.getId();
		LocalDate date2 = LocalDate.now().plusDays(1);
		LocalDate date1 = LocalDate.now().minusDays(6);
		List <OrderEntity> orderList = orderRepo.getOrderByDates(date1, date2);
		UniversalDTO udto = new UniversalDTO() {
			@Getter List<UniversalDTO> list1 = orderList.stream().map(order->{
				RecieptDTO reciept = new RecieptDTO();
				reciept.setOrderDate(order.getOrderDate());
				double baseAmt = order.getOrderItems().stream().filter(e->e.getBook().getPublisher()!=null&&e.getBook().getPublisher().getId()==id).mapToDouble(ele->ele.getBasePrice()).sum();
				double disAmt = order.getOrderItems().stream().filter(e->e.getBook().getPublisher()!=null&&e.getBook().getPublisher().getId()==id).mapToDouble(ele->ele.getBasePrice()*ele.getDiscountPercent()/100).sum();
				double netAmt = baseAmt - disAmt;
				reciept.setNetAmt(netAmt);
				order.getRentItems().stream().forEach(ele->{
					RecieptItemsDTO rtd = new RecieptItemsDTO();
					
					BookEntity book1 = ele.getBook();
					if(book1.getPublisher()!=null&&book1.getPublisher().getId()==id) {
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
	public UniversalDTO getPublisherDetails() {
		return new UniversalDTO() {
		@Getter Long id = userService.getUserId();
		@Getter String name = publisherRepo.findById(id).orElseThrow().getName();
		};
	}

}
