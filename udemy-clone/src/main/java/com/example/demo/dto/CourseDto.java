package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.Base64;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CourseDto {
	private long coureId;
	private String title;
	private String description;
	private BigDecimal fees;
	private String category;
	private String teacherName;
	private String imageBase64;
	public CourseDto(long coureId, String title, String description, BigDecimal fees, String category,
			String teacherName, byte[] imageBase64) {
		
		this.coureId = coureId;
		this.title = title;
		this.description = description;
		this.fees = fees;
		this.category = category;
		this.teacherName = teacherName;
		this.imageBase64 = imageBase64 !=null ? Base64.getEncoder()
				.encodeToString(imageBase64): null;
	}
	
	

}








