package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TeacherNotFoundException extends ResponseStatusException{
	
	public TeacherNotFoundException() {
		super(HttpStatus.BAD_REQUEST, "Teacher Not Found!");
	}

}
