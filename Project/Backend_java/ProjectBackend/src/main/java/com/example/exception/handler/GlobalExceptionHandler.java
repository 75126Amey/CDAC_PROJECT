package com.example.exception.handler;

import javax.naming.AuthenticationException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.exception.exceptions.InvalidCardDetailsException;
import com.example.exception.exceptions.UniqueConstraintViolationException;
import com.example.response.ApiResponseError;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(UniqueConstraintViolationException.class)
	@ResponseStatus(code = HttpStatus.OK)
	public ApiResponseError<?> exception1(UniqueConstraintViolationException err) {
		return new ApiResponseError<String>("error",err.getMessage());
	}	
@ExceptionHandler(AuthenticationException.class)
@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public ApiResponseError<?> exception2(AuthenticationException err) {
	return new ApiResponseError<String>("error",err.getMessage());
}
@ExceptionHandler(RuntimeException.class)
@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public ApiResponseError<?> exception3(RuntimeException err) {
	return new ApiResponseError<String>("error",err.getMessage());
}
@ExceptionHandler(InvalidCardDetailsException.class)
@ResponseStatus(code=HttpStatus.OK)
public ApiResponseError<?> exception3(InvalidCardDetailsException err) {
	return new ApiResponseError<String>("error",err.getMessage());
}
}
