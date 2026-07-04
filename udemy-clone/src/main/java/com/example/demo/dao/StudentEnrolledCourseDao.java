package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.CourseDto;
import com.example.demo.entity.StudentEnrolledCourse;

public interface StudentEnrolledCourseDao 
extends JpaRepository<StudentEnrolledCourse,Long>{
	@Query("""
			select new com.example.demo.dto.CourseDto(
			c.id,
			c.title,
			c.description,
			c.fees,
			cat.categoryName,
			t.username,
			c.image
			) from StudentEnrolledCourse sec join sec.student s
			join sec.course c join c.category cat join c.teacher t
			where s.username =:username
						""")
	List<CourseDto> 
	findCoursesByLoggedInUserName(@Param("username")String username);
		//AlreadyEnrolledCourse
	@Query("""
			select sc from StudentEnrolledCourse sc
			where sc.student.username =:username and
			sc.course.id=:id
			""")
	Optional<StudentEnrolledCourse> 
	testAlreadyEnrolledCourse(@Param("username")String username,
			@Param("id")long courseId);
}
