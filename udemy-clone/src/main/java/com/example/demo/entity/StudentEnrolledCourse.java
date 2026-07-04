package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StudentEnrolledCourse extends IdClass{
	private String orderId;
	private LocalDate orderDate;
	private int completionState;
	@ManyToOne
	private Student student;
	@ManyToOne
	private Course course;
	public StudentEnrolledCourse(String orderId, LocalDate orderDate, int completionState) {
		super();
		this.orderId = orderId;
		this.orderDate = orderDate;
		this.completionState = completionState;
	}
}
