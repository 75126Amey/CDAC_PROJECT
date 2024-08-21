package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entities.UserEntity;
import com.example.repositories.UserRepositiory;



@Service
@Transactional
public class CustomUserDetailService implements UserDetailsService{
	@Autowired
	private UserRepositiory user;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	UserEntity user1 = user.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("Email doesn't exist"));
		// TODO Auto-generated method stub
		return new CustomUserDetails(user1);
	}

}
