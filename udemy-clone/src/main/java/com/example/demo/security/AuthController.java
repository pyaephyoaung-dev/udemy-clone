package com.example.demo.security;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RegisterDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;
	
	record LoginRequest(String username,String password) {}
	
	@PostMapping("/register")
	public String register(@RequestBody RegisterDto registerDto) {
		return authService.register(registerDto);
	}
	

	@PostMapping("/login")
	public Map<String, String> login(@RequestBody LoginRequest request){
		return authService.login(request.username,
				request.password);
	}
}
 