package com.example.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.collections4.map.HashedMap;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.BookViewDTO;
import com.example.dto.ReviewAddDTO;
import com.example.entities.BookEntity;
import com.example.entities.OrderEntity;
import com.example.entities.OrderItemEntity;
import com.example.entities.PublisherEntity;
import com.example.entities.RentEntity;
import com.example.repositories.OrderRepository;

@Service
@Transactional
public class ExcelServicesImpl  implements ExcelServices{
	@Autowired
	private AuthorService authorService;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private ProAuthorService proAuthService;
	@Override
	public ByteArrayInputStream bookReviewsByAuthor(Long id) {
		try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();){
			List<BookViewDTO> list1 = proAuthService.getBooksByAuthor(id);
			list1.forEach(book->{
				Sheet sheet = workbook.createSheet(book.getBookTitle());
				Row row = sheet.createRow(0);
				row.createCell(0).setCellValue("Customer Name");
				row.createCell(1).setCellValue("Rating");
				row.createCell(2).setCellValue("Comment");
				int idx = 1;
				for (ReviewAddDTO review:book.getReviews()) {
					Row rowtemp = sheet.createRow(idx);
					rowtemp.createCell(0).setCellValue(review.getCustomerName());
					rowtemp.createCell(1).setCellValue(review.getRating());
					rowtemp.createCell(2).setCellValue(review.getComment());
					idx++;
				}	
				});
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		}	
	}
	@Override
	public ByteArrayInputStream salesPerOrder() {
		try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();){   
			LocalDate date2 = LocalDate.now().plusDays(1);
			LocalDate date1 = LocalDate.now().minusDays(6);
			List<LocalDate> daysRange = Stream.iterate(date1, date -> date.plusDays(1)).limit(7).collect(Collectors.toList());
			List<OrderEntity> list1 = orderRepo.getOrderByDates(date1,date2);
			daysRange.forEach(date->{
				Sheet sheet = workbook.createSheet(date.toString());
				Row row = sheet.createRow(0);
				row.createCell(0).setCellValue("Order No");
				row.createCell(1).setCellValue("Order Time");
				row.createCell(2).setCellValue("Customer mail id");
				row.createCell(3).setCellValue("Sales");
				row.createCell(4).setCellValue("Revenue Generated");
				List<OrderEntity> list2 = list1.stream().filter(e->e.getOrderDate().toLocalDate().equals(date)).collect(Collectors.toList());
				int idx = 1;
				for(OrderEntity order:list2) {
					Row rowtemp = sheet.createRow(idx);
					rowtemp.createCell(0).setCellValue(order.getOrderNo());
					rowtemp.createCell(1).setCellValue(order.getOrderDate().toString());
					rowtemp.createCell(2).setCellValue(order.getCustomer().getEmail());
					int totalSales = 0;
					for(OrderItemEntity buyItem:order.getOrderItems()) {
						totalSales+=buyItem.getBasePrice()*(1-(buyItem.getDiscountPercent())/100);
					}
					for(RentEntity rentItem:order.getRentItems()) {
						int days = (int)rentItem.getRentStartDate().until(rentItem.getRentEndDate(), ChronoUnit.DAYS);
						totalSales+=rentItem.getRentPerDay()*days;
					}
					rowtemp.createCell(3).setCellValue(totalSales);
					rowtemp.createCell(4).setCellValue(totalSales*.25);
					idx++;
				}	
				});
			
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		}	
	}
	@Override
	public ByteArrayInputStream salesPerBookForAuthor(Long id) {
		try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();){   
			LocalDate date2 = LocalDate.now().plusDays(1);
			LocalDate date1 = LocalDate.now().minusDays(6);
			List<LocalDate> daysRange = Stream.iterate(date1, date -> date.plusDays(1)).limit(7).collect(Collectors.toList());
			List<OrderEntity> list1 = orderRepo.getOrderByDates(date1,date2);
			daysRange.forEach(date->{
				int sales = 0;
				Sheet sheet = workbook.createSheet(date.toString());
				Row row = sheet.createRow(0);
				row.createCell(0).setCellValue("Book Title");
				row.createCell(1).setCellValue("Sales");
				row.createCell(2).setCellValue("Revenue Generated");
				List<OrderEntity> list2 = list1.stream().filter(e->e.getOrderDate().toLocalDate().equals(date)).collect(Collectors.toList());
				int idx = 1;
				for(OrderEntity order:list2) {
					Row rowtemp = sheet.createRow(idx);
					Map<String,Double> bookSales = new HashMap<>();
					for(OrderItemEntity buyItem:order.getOrderItems()) {
						if(buyItem.getBook().getBookAuthors().stream().map(ele->ele.getAuthor().getId()).anyMatch(ele->ele==id)) {
							String title = buyItem.getBook().getBookTitle();
							if(!bookSales.containsKey(title)){
								bookSales.put(title, buyItem.getBasePrice()*(1-(buyItem.getDiscountPercent())/100));
							}
							else {
								bookSales.put(title, bookSales.get(title)+buyItem.getBasePrice()*(1-(buyItem.getDiscountPercent())/100));
							}	
						}
						
					}
					for(RentEntity rentItem:order.getRentItems()) {
						if(rentItem.getBook().getBookAuthors().stream().map(ele->ele.getAuthor().getId()).anyMatch(ele->ele==id)) {
						String title = rentItem.getBook().getBookTitle();
						int days = (int)rentItem.getRentStartDate().until(rentItem.getRentEndDate(), ChronoUnit.DAYS);
						if(!bookSales.containsKey(title)){
							bookSales.put(title,rentItem.getRentPerDay()*days);
						}
						else {
							bookSales.put(title, bookSales.get(title)+rentItem.getRentPerDay()*days);
						}
						}
					}
					Set<Map.Entry<String, Double>> sets = bookSales.entrySet();
					for(Map.Entry<String, Double> entry:sets) {
					Row row2 = sheet.createRow(idx);
					row2.createCell(0).setCellValue(entry.getKey());
					row2.createCell(1).setCellValue(entry.getValue());
					row2.createCell(2).setCellValue(entry.getValue()*.75);
					idx++;
					}
					
				}	
				});
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		}	
	}
	@Override
	public ByteArrayInputStream salesPerBookForPublisher(Long id) {
		try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();){   
			LocalDate date2 = LocalDate.now().plusDays(1);
			LocalDate date1 = LocalDate.now().minusDays(6);
			List<LocalDate> daysRange = Stream.iterate(date1, date -> date.plusDays(1)).limit(7).collect(Collectors.toList());
			List<OrderEntity> list1 = orderRepo.getOrderByDates(date1,date2);
			daysRange.forEach(date->{
				int sales = 0;
				Sheet sheet = workbook.createSheet(date.toString());
				Row row = sheet.createRow(0);
				row.createCell(0).setCellValue("Book Title");
				row.createCell(1).setCellValue("Sales");
				row.createCell(2).setCellValue("Revenue Generated");
				List<OrderEntity> list2 = list1.stream().filter(e->e.getOrderDate().toLocalDate().equals(date)).collect(Collectors.toList());
				int idx = 1;
				for(OrderEntity order:list2) {
					Row rowtemp = sheet.createRow(idx);
					Map<String,Double> bookSales = new HashMap<>();
					for(OrderItemEntity buyItem:order.getOrderItems()) {
						PublisherEntity publisher = buyItem.getBook().getPublisher();
						if(publisher!=null&&publisher.getId()==id) {
							String title = buyItem.getBook().getBookTitle();
							if(!bookSales.containsKey(title)){
								bookSales.put(title, buyItem.getBasePrice()*(1-(buyItem.getDiscountPercent())/100));
							}
							else {
								bookSales.put(title, bookSales.get(title)+buyItem.getBasePrice()*(1-(buyItem.getDiscountPercent())/100));
							}	
						}
						
					}
					for(RentEntity rentItem:order.getRentItems()) {
						PublisherEntity publisher = rentItem.getBook().getPublisher();
						if(publisher!=null&&publisher.getId()==id) {
						String title = rentItem.getBook().getBookTitle();
						int days = (int)rentItem.getRentStartDate().until(rentItem.getRentEndDate(), ChronoUnit.DAYS);
						if(!bookSales.containsKey(title)){
							bookSales.put(title,rentItem.getRentPerDay()*days);
						}
						else {
							bookSales.put(title, bookSales.get(title)+rentItem.getRentPerDay()*days);
						}
						}
					}
					Set<Map.Entry<String, Double>> sets = bookSales.entrySet();
					for(Map.Entry<String, Double> entry:sets) {
					Row row2 = sheet.createRow(idx);
					row2.createCell(0).setCellValue(entry.getKey());
					row2.createCell(1).setCellValue(entry.getValue());
					row2.createCell(2).setCellValue(entry.getValue()*.75);
					idx++;
					}
					
				}	
				});
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		}	
	}

}
