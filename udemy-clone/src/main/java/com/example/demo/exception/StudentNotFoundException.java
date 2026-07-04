package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class StudentNotFoundException extends ResponseStatusException{
	
	public StudentNotFoundException() {
		super(HttpStatus.BAD_REQUEST,"Student Not Found!");
	}

}
