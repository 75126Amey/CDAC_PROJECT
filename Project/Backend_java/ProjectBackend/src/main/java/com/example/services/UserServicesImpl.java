package com.example.services;

import java.util.Collection;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.RegisterDTO;
import com.example.entities.UserEntity;
import com.example.exception.exceptions.UniqueConstraintViolationException;
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
public String registerUser(RegisterDTO user) {
		user.setPassword(encoder.encode(user.getPassword()));
	UserEntity user1 = mapper.map(user, UserEntity.class);
	if(userRepo.existsByEmail(user.getEmail())) {
		throw new UniqueConstraintViolationException("EMAIL_EXISTS");
	}
	userRepo.save(user1);
	return "Added successfully";
}
public String getUserRole() {
	Collection<? extends GrantedAuthority> roles = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
	var role = roles.stream().findAny().orElseThrow();
	return role.toString();
}

@Override
public long getUserId(String email) {
	UserEntity user = userRepo.findByEmail(email).orElseThrow();
	// TODO Auto-generated method stub
	return user.getId();
}
@Override
public String getUserMail() {
	// TODO Auto-generated method stub
	return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
}
@Override
public boolean checkIfEmailExists(String email) {
	if(userRepo.existsByEmail(email))
		throw new UniqueConstraintViolationException("EMAIL_EXISTS");
	return true;
}
@Override
public long getUserId() {
	UserEntity user = userRepo.findByEmail(getUserMail()).orElseThrow();
	// TODO Auto-generated method stub
	return user.getId();
}
}
