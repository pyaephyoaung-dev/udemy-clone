package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.CourseDto;
import com.example.demo.entity.Course;
/*
 * CourseDto(long coureId, String title, String description, BigDecimal fees, String category,
			String teacherName, byte[] imageBase64) {
 */
public interface CourseDao extends JpaRepository<Course,Long>{
	@Query("""
select new com.example.demo.dto.CourseDto(
c.id,
c.title,
c.description,
c.fees,
cat.categoryName,
t.username,
c.image
) from Course c join c.category cat join c.teacher t
			""")
	List<CourseDto> findAllCourses();
	
	@Query("""
select new com.example.demo.dto.CourseDto(
c.id,
c.title,
c.description,
c.fees,
cat.categoryName,
t.username,
c.image
) from Course c join c.category cat join c.teacher t
where t.username =:username
			""")
	List<CourseDto> findAllCoursesByTeacherName(@Param("username")String username);
	
	
	
	
	
	
	
	
	
	
	
	

}
