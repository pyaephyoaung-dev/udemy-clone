package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category extends IdClass{
	private String categoryName;
	@OneToMany(mappedBy = "category")
	private List<Course> courses=
			new ArrayList<>();
	public void addCourse(Course course) {
		course.setCategory(this);
		courses.add(course);
	}
}





