package com.example.services;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.BookSearchViewDTO;
import com.example.dto.BookViewDTO;
import com.example.dto.KeywordAddDTO;
import com.example.dto.ProAuthorDetailsDTO;
import com.example.dto.ProAuthorRegisterDTO;
import com.example.entities.BookEntity;
import com.example.entities.ProAuthorEntity;
import com.example.repositories.ProAuthorRepositiory;

@Service
@Transactional
public class ProAuthorServiceImpl implements ProAuthorService {
	@Autowired
	ModelMapper mapper;
	@Autowired
	ProAuthorRepositiory proAuthorRepo;
	@Autowired
	BookService bookService;
	@Override
	public String registerAuthor(ProAuthorRegisterDTO user) {
		// TODO Auto-generated method stub
		ProAuthorEntity author = mapper.map(user, ProAuthorEntity.class);
		try {
			author.setPhoto(user.getPhoto().getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		proAuthorRepo.save(author);
		return "Author Sucessfully added";
	}
	@Override
	public ProAuthorDetailsDTO getAuthorDetails(Long id) {
		ProAuthorEntity author = proAuthorRepo.findById(id).orElseThrow();
		return mapper.map(author, ProAuthorDetailsDTO.class);
	}
	@Override
	public String updateAuthorDetails(ProAuthorDetailsDTO author) {
		ProAuthorEntity pro = proAuthorRepo.findById(author.getId()).orElseThrow();
		pro.setAboutAuthor(author.getAboutAuthor());
		pro.setWebsite(author.getWebsite());
		return null;
	}
	@Override
	public List<BookViewDTO> getBooksByAuthor(Long id){
		ProAuthorEntity pro2 = proAuthorRepo.findById(id).orElseThrow();
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
	@Override
	public List<BookSearchViewDTO> get5BooksByAuthor(Long id) {
		// TODO Auto-generated method stub
		List<BookEntity> bookEntities =  proAuthorRepo.get5BookByAuthor(id,PageRequest.of(0, 5));
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
	public byte[] getImageByAuthor(Long id) {
	return proAuthorRepo.findById(id).orElseThrow().getPhoto();
	}
}
