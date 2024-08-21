package com.example.services;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.SignInDTO;
import com.example.dto.UserDTO;
import com.example.entities.UserEntity;
import com.example.repositories.UserRepositiory;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServicesImpl implements UserServices{
	@Autowired
	private UserRepositiory userRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder encoder;
	@Value("${EXP_TIMEOUT}")
	private String path;
public String registerUser(UserDTO user) throws IOException {
		user.setPassword(encoder.encode(user.getPassword()));
	UserEntity user1 = mapper.map(user, UserEntity.class);
//	user1.setPhoto(user.getPhoto().getBytes());
//	user1.setIdentification(user.getIdentification().getBytes());
	user1.setPhoto(user.getPhoto().getOriginalFilename());
	user1.setIdentification(user.getIdentification().getOriginalFilename());
	FileUtils.writeByteArrayToFile(new File("images/"+user.getPhoto().getOriginalFilename()), user.getPhoto().getBytes());
	FileUtils.writeByteArrayToFile(new File("images/"+user.getIdentification().getOriginalFilename()), user.getIdentification().getBytes());
	if(userRepo.existsByEmail(user.getEmail())) {
		throw new RuntimeException("User exists");
	}
	userRepo.save(user1);
	return "Added successfully";
}
@Override
public UserEntity getUSer(String email) {
	UserEntity user =userRepo.findByEmail(email).orElseThrow(); 
	return user;
}
}
