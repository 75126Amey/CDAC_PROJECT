package com.example.exception.handler;

import javax.naming.AuthenticationException;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
@ExceptionHandler(AuthenticationException.class)
public String exception1(AuthenticationException err) {
	return err.getMessage();
}
@ExceptionHandler(RuntimeException.class)
public String exception2(RuntimeException err) {
	return err.getMessage();
}
}
