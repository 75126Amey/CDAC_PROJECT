package com.example.services;

import java.io.IOException;

import com.example.dto.SignInDTO;
import com.example.dto.UserDTO;
import com.example.entities.UserEntity;

public interface UserServices {

public String registerUser(UserDTO user) throws IOException;
public UserEntity getUSer(String email);
}
