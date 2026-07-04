package com.example.demo.entity;

import java.math.BigDecimal;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("SITEOWNER")
public class SiteOwner extends User{
	
	private BigDecimal platformShare;

	public SiteOwner(String username, String password, String email) {
		super(username, password, email);
	}
	
	
}
