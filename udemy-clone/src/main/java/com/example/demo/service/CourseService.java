package com.example.demo.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.CategoryDao;
import com.example.demo.dao.CourseDao;
import com.example.demo.dao.SiteOwnerDao;
import com.example.demo.dao.StudentDao;
import com.example.demo.dao.StudentEnrolledCourseDao;
import com.example.demo.dao.TeacherDao;
import com.example.demo.dto.CourseDto;
import com.example.demo.entity.Category;
import com.example.demo.entity.Course;
import com.example.demo.entity.CourseLesson;
import com.example.demo.entity.SiteOwner;
import com.example.demo.entity.Student;
import com.example.demo.entity.StudentEnrolledCourse;
import com.example.demo.entity.Teacher;
import com.example.demo.exception.AlreadyEnrolledCourseException;
import com.example.demo.exception.StudentNotFoundException;
import com.example.demo.exception.TeacherNotFoundException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {
	private final CourseDao courseDao;
	private final CategoryDao categoryDao;
	private final TeacherDao teacherDao;
	private final StudentDao studentDao;
	private final StudentEnrolledCourseDao studentEnrolledCourseDao;
	private final SiteOwnerDao siteOwnerDao;
	// searchCourse,generateOrderId,searchStudent
	
	public List<CourseDto> getAllEnrolledCourses(String username){
		return studentEnrolledCourseDao
				.findCoursesByLoggedInUserName(username);
	}
	public List<CourseLesson> getAllCourseLessons(long courseId){
		return getCourse(courseId).getCourseLessons();
	}
	
	public String addLessons(CourseLesson courseLesson,Long courseId) {
		Course course=getCourse(courseId);
		course.addCourseLesson(courseLesson);
		courseDao.saveAndFlush(course);
		return "%s successfully add to %s course"
				.formatted(courseLesson.lessonName(),
						course.getTitle());
	}

	private String generateOrder(String username) {
		SecureRandom random = new SecureRandom();
		int code = random.nextInt(100000) + 100000;
		StringBuilder sb = new StringBuilder();
		sb.append(username.toUpperCase()).append(code);
		return sb.toString();
	}

	private Course getCourse(long id) {
		return courseDao.findById(id).get();
	}

	private Student findStudentByName(String studentName) {
		return studentDao.findByUsername(studentName).orElseThrow(StudentNotFoundException::new);
	}

	@Transactional
	public String enrolledCourse(List<Long> courseIds, String studentName) {
		Student student = findStudentByName(studentName);
		String orderId = generateOrder(studentName);
		for (Long courseId : courseIds) {
			Optional<StudentEnrolledCourse> studentEnrollOptional=studentEnrolledCourseDao
					.testAlreadyEnrolledCourse(studentName, courseId);
			if(studentEnrollOptional.isPresent()) {
				throw new AlreadyEnrolledCourseException(studentName,courseId);
			}
					
			Course course = getCourse(courseId);
			course.setStudetCount(course.getStudetCount() + 1);
			StudentEnrolledCourse studentEnrolledCourse = new StudentEnrolledCourse(orderId, LocalDate.now(), 0);
			student.addEnrolledCourse(studentEnrolledCourse);
			course.addEnrolledStudentCourse(studentEnrolledCourse);
			studentEnrolledCourseDao.save(studentEnrolledCourse);

			// calculate -course-studentCount,teacher-netWorth,siteOwner-platformShare
			SiteOwner siteOwner = getSiteOwner();
			Teacher teacher = course.getTeacher();
			double tenPercent = course.getFees().doubleValue() * 0.1;
			double nintyPercent = course.getFees().doubleValue() * 0.9;
			teacher.setNetWorth(teacher.getNetWorth().add(BigDecimal.valueOf(nintyPercent)));
			siteOwner.setPlatformShare(siteOwner.getPlatformShare().add(BigDecimal.valueOf(tenPercent)));
		}
		return "%s enrolled successfully with orderId: %s".formatted(studentName, orderId);
	}

	private SiteOwner getSiteOwner() {
		return siteOwnerDao.findById(4L).get();
	}

	public List<CourseDto> findAllCourses() {
		return courseDao.findAllCourses();
	}

	public List<CourseDto> findAllCoursesByTeacherName(String username) {
		return courseDao.findAllCoursesByTeacherName(username);
	}

	@Transactional
	public String createCourse(String title, String description, double fees, MultipartFile image, String categoryName,
			String teacherName) throws IOException {
		Category category = getCategoryByName(categoryName);
		Teacher teacher = getTeacherByName(teacherName);
		Course course = new Course();
		course.setFees(BigDecimal.valueOf(fees));
		course.setTitle(title);
		course.setDescription(description);
		if (image != null) {
			course.setImage(image.getBytes());
		}
		teacher.addCourse(course);
		category = categoryDao.save(category);
		category.addCourse(course);
		courseDao.save(course);
		return "%s course successfully created.".formatted(title);

	}

	private Teacher getTeacherByName(String teacherName) {
		return teacherDao.findByUsername(teacherName).orElseThrow(TeacherNotFoundException::new);
	}

	private Category getCategoryByName(String categoryName) {
		return categoryDao.findByCategoryName(categoryName).orElseGet(() -> {
			Category category = new Category();
			category.setCategoryName(categoryName);
			return category;
		});
	}

}
