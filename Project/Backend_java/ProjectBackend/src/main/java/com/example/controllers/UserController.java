package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.RegisterDTO;
import com.example.dto.SignInDTO;
import com.example.response.ApiResponseSuccess;
import com.example.response.ApiResponseToken;
import com.example.security.JwtUtils;
import com.example.services.UserServices;

import jakarta.validation.constraints.Email;



@RestController
@RequestMapping("/user")
@CrossOrigin
@Validated
public class UserController {
	@Autowired
	private UserServices services;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private AuthenticationManager authMgr;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody RegisterDTO user){
	ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
	response.setData(services.registerUser(user));
	return ResponseEntity.ok(response);
			
}
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody SignInDTO user) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
		Authentication verifiedToken = authMgr.authenticate(token);
		String jwtToken=  jwtUtils.generateJwtToken(verifiedToken);
		ApiResponseToken response = new ApiResponseToken("success",jwtToken);
		return ResponseEntity.ok(response);
}
	@GetMapping("/getRole")
	public ResponseEntity<?>  getUserRole() {
		ApiResponseSuccess<String> response = new ApiResponseSuccess<String>();
		response.setData(services.getUserRole());
		return ResponseEntity.ok(response);
	}
	@GetMapping("/getUserId/{email}")
	public ResponseEntity<?>  getUserId(@PathVariable  String email) {
		ApiResponseSuccess<Long> response = new ApiResponseSuccess<>();
		response.setData(services.getUserId(email));
		return ResponseEntity.ok(response);
	}
	@GetMapping("/getUserId")
	public ResponseEntity<?>  getUserIdAfterAuthentication() {
		ApiResponseSuccess<Long> response = new ApiResponseSuccess<>();
		response.setData(services.getUserId());
		return ResponseEntity.ok(response);
	}
	@GetMapping("/checkEmail/{email}")
	public ResponseEntity<?>  checkIfEmailExists(@PathVariable @Email String email) {
		ApiResponseSuccess<Boolean> response = new ApiResponseSuccess<>();
		response.setData(services.checkIfEmailExists(email));
		return ResponseEntity.ok(response);
	}
}
