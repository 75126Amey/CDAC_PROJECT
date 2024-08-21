package com.example.controllers;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.SignInDTO;
import com.example.dto.Test1DTO;
import com.example.dto.UserDTO;
import com.example.entities.UserEntity;
import com.example.repositories.UserRepositiory;
import com.example.security.JwtUtils;
import com.example.services.UserServices;



@RestController
@RequestMapping("/user")
@Transactional
public class UserController {
	@Autowired
	private UserServices services;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private AuthenticationManager authMgr;
	@Autowired
	private UserRepositiory repo;
	@PostMapping("/testRegister")
	public String test1(@RequestBody SignInDTO user) {
	return null;
	//return services.registerUser(user);
			
}
	@PostMapping("/testLogin")
	public String test2(@RequestBody SignInDTO user) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
		Authentication verifiedToken = authMgr.authenticate(token);
		
		return jwtUtils.generateJwtToken(verifiedToken);
}
	@GetMapping("/testDemo")
	public String test3() {
		return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
	}
	@PostMapping(value="/testUpload",consumes = "multipart/form-data")
	public String test4(@ModelAttribute UserDTO user) throws IOException {
		services.registerUser(user);
		return "sucesss";
	}
	@CrossOrigin
	@GetMapping(value="/testDownload/")
	public String test5() {
		
		return "Hello";
	}
	@PostMapping(value="/array")
	public List<UserEntity> test6(@RequestBody Test1DTO body) {
		return repo.findAllById(body.getNums());
	}
}
