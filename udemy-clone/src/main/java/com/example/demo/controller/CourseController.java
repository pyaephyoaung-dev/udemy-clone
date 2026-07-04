package com.example.demo.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.CourseDto;
import com.example.demo.entity.Category;
import com.example.demo.entity.CourseLesson;
import com.example.demo.service.CourseService;

import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
	@Autowired
	private CourseService courseService;
	@GetMapping
	public List<CourseDto> findAllCourses(){
		return courseService.findAllCourses();
	}
	@GetMapping("/{id}/course-lessons")
	public List<CourseLesson> fetchAllLessons(@PathVariable("id")long courseId){
		return courseService.getAllCourseLessons(courseId);
	}
	
	public record EnrolledDto(List<Long> courseIds) {}
	
	@PostMapping("/{id}/lessons")
	public ResponseEntity<String> addLessons(@RequestBody CourseLesson lessons,
			@PathVariable("id")long courseId){
		String returnString= courseService.addLessons(lessons, courseId);
		return ResponseEntity.ok().body(returnString);
	}
	
	@GetMapping("/enrolled-courses")
	public List<CourseDto> fetchAllEnrolledCourses(Principal principal){
		return courseService.getAllEnrolledCourses(principal.getName());
	}
	
	@PostMapping("/enroll")
	public ResponseEntity<String> enrolledCourse(@RequestBody EnrolledDto enroll,
			Principal principal){
		String returnString= courseService.enrolledCourse(
				enroll.courseIds,
				principal.getName());
		System.out.println(enroll);
		System.out.println("student name:"+ principal.getName());
		return new ResponseEntity<String>("success",HttpStatus.CREATED);
	}
	
	@GetMapping("/teacher")
	public List<CourseDto> findAllCoursesByTeacher(Principal principal){	
		return courseService
				.findAllCoursesByTeacherName(principal.getName());
	}
	@PostMapping
	public ResponseEntity<String> createCourse(
			@RequestParam("title")String title,
			@RequestParam("description")String description,
			@RequestParam("fees")double fees,
			@RequestParam("category_name")String categoryName,
			@RequestParam(value="image",required = false)MultipartFile image,
			Principal principal) 
	throws IOException{
		String teacherName=principal.getName();
		String returnString=courseService.createCourse(title, description, fees, image, categoryName, teacherName);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(returnString);
	}

}
