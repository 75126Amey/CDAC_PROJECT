package com.example.exception.exceptions;

public class InvalidCardDetailsException extends RuntimeException{
public InvalidCardDetailsException(String message) {
	super(message);
}
}
