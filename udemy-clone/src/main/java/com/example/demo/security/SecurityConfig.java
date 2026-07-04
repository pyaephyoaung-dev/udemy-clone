package com.example.demo.security;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class SecurityConfig {
	@Autowired
	private UserDetailsService userDetailsService;
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http)
	throws Exception{
		http.httpBasic(Customizer.withDefaults());
		http.sessionManagement(c -> c
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.csrf(c -> c.disable());
		http.authorizeHttpRequests( c ->{
			c.requestMatchers("/api/auth/**").permitAll();
			c.anyRequest().authenticated();
		});
		http.cors(c ->{
			CorsConfigurationSource source=new CorsConfigurationSource() {
				
				@Override
				public @Nullable CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
					CorsConfiguration config=new CorsConfiguration();
					config.setAllowedOriginPatterns(List.of("*"));
					config.setAllowedHeaders(List.of("*"));
					config.setAllowedMethods(List.of("*"));
					config.setExposedHeaders(List.of("*"));
					config.setAllowCredentials(true);
					return config;
				}
			};
			c.configurationSource(source);
		});
		return http.build();
	}
	@Bean
	public AuthenticationManager authenticationManager(
			AuthenticationConfiguration config)throws Exception{
		return config.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
