package com.example.demo.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Course extends IdClass{
	private String title;
	private BigDecimal fees;
	@Column(columnDefinition = "text")
	private String description;
	private int studetCount;
	@Lob
	private byte[] image;
	@ManyToOne
	private Category category;
	@ManyToOne
	private Teacher teacher;
	@CollectionTable(name = "course_lessons")
	@ElementCollection(fetch = FetchType.EAGER)
	private List<CourseLesson> courseLessons=
			new ArrayList<>();
	
	public void addCourseLesson(CourseLesson courseLesson) {
		courseLessons.add(courseLesson);
	}
	
	@OneToMany(mappedBy = "course")
	private List<StudentEnrolledCourse> enrolledCourses=
			new ArrayList<>();
	
	public void addEnrolledStudentCourse(StudentEnrolledCourse course) {
		course.setCourse(this);
		enrolledCourses.add(course);
	}
	
}







