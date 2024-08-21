package com.example.services;

import com.example.dto.RegisterDTO;

public interface UserServices {

public String registerUser(RegisterDTO user);
public String getUserRole();
public long getUserId(String email);
public long getUserId();
public String getUserMail();
public boolean checkIfEmailExists(String email);
}
