package com.example.demo.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("TEACHER")
public class Teacher extends User{
	private BigDecimal netWorth;
	private String education;
	@OneToMany(mappedBy = "teacher")
	private List<Course> courses=
			new ArrayList<>();
	
	public void addCourse(Course course) {
		course.setTeacher(this);
		courses.add(course);
	}
	
	public Teacher(String username, String password, String email, BigDecimal netWorth, String education) {
		super(username, password, email);
		this.netWorth = netWorth;
		this.education = education;
		
	}
	
	
	@CollectionTable(name = "teacher_skill")
	@ElementCollection(fetch = FetchType.EAGER)
	private List<String> skills=
			new ArrayList<>();
	public void addSkill(String skill) {
		skills.add(skill);
	}
	
}
