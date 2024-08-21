package com.example.exception.exceptions;

public class UniqueConstraintViolationException extends RuntimeException{
public UniqueConstraintViolationException(String message) {
	super(message);
}
}
