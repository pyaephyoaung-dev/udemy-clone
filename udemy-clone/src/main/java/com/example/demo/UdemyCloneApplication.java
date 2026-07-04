package com.example.demo;

import java.math.BigDecimal;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.dao.RoleDao;
import com.example.demo.dao.SiteOwnerDao;
import com.example.demo.dao.StudentDao;
import com.example.demo.dao.StudentEnrolledCourseDao;
import com.example.demo.dao.TeacherDao;
import com.example.demo.entity.Role;
import com.example.demo.entity.SiteOwner;
import com.example.demo.entity.Student;
import com.example.demo.entity.StudentEducation;
import com.example.demo.entity.StudentEnrolledCourse;
import com.example.demo.entity.Teacher;

import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class UdemyCloneApplication {
	private final TeacherDao teacherDao;
	private final StudentDao studentDao;
	private final RoleDao roleDao;
	private final SiteOwnerDao siteOwnerDao;
	private final PasswordEncoder passwordEncoder;
	private final StudentEnrolledCourseDao studentEnrolledCourseDao;
	
	private Role getRoleByName(String roleName) {
		return roleDao.findByRoleName(roleName)
				.orElseGet(()->{
					Role role=new Role();
					role.setRoleName(roleName);
					return role;
				});
	}
	//	public Teacher(String username, String password, String email, BigDecimal netWorth, String education) {
	@Bean //@Profile("dev")
	public ApplicationRunner runner() {
		return r ->{
//			studentEnrolledCourseDao.findCoursesByLoggedInUserName("thomas")
//			.forEach(System.out::println);
//			Role teacherRole=getRoleByName("ROLE_TEACHER");
//			Teacher teacher=new Teacher(
//					"john",
//					passwordEncoder.encode("12345"), 
//					"john@email.com", BigDecimal.valueOf(0),"MSc");
//			teacher.addSkill("Java");
//			teacher.addSkill("Groovy");
//			teacher.addSkill("CS");
//			teacher.addRole(roleDao.save(teacherRole));
//			//teacherDao.save(teacher);
//			
//			Role studentRole=getRoleByName("ROLE_STUDENT");
//			Student student=new Student("mary",
//					passwordEncoder.encode("12345"),
//					"mary@email.com","No.11 Strand Road",
//					StudentEducation.UNDER_GRADUATE);
//			student.addRole(roleDao.save(studentRole));
//			//studentDao.save(student);
//			
//			Role siteOwnerRole= getRoleByName("ROLE_SITE_OWNER");
//			SiteOwner siteOwner=new SiteOwner("william",
//					passwordEncoder.encode("12345"),
//					"william@email.com");
//			siteOwner.setPlatformShare(BigDecimal.valueOf(0));
//			siteOwner.addRole(roleDao.save(siteOwnerRole));
//			siteOwnerDao.save(siteOwner);
			
			
		};
	}
	

	public static void main(String[] args) {
		SpringApplication.run(UdemyCloneApplication.class, args);
	}

}
