package com.example.demo.security;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dao.RoleDao;
import com.example.demo.dao.StudentDao;
import com.example.demo.dao.TeacherDao;
import com.example.demo.dto.RegisterDto;
import com.example.demo.entity.Role;
import com.example.demo.entity.Student;
import com.example.demo.entity.StudentEducation;
import com.example.demo.entity.Teacher;

import jakarta.persistence.criteria.CriteriaBuilder.Case;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final AuthenticationManager authenticationManager;
	private final PasswordEncoder passwordEncoder;
	private final StudentDao studentDao;
	private final TeacherDao teacherDao;
	private final RoleDao roleDao;
	/*
	 * String username,String password,String email
	 * student-String address,StudentEducation studentEducation,
	 * teacher-List skill,BidgDecimal netWorth,String education
	 * String userType
	 */
	
	
	
	private Role getRoleByName(String roleName) {
		return roleDao.findByRoleName(roleName)
				.orElseGet(() ->{
					Role role=new Role();
					role.setRoleName(roleName);
					return role;
				});
	}
	public String register(RegisterDto register) {
		String returnString=switch (register.userType() ){
		case "teacher" -> {
			var teacher=new Teacher(
					register.username(),
					passwordEncoder.encode(register.password()),
					register.email(),
					BigDecimal.valueOf(0),
					register.education());
			teacher.setSkills(register.skills());
			Role teacherRole=getRoleByName("ROLE_TEACHER");
			teacher.addRole(roleDao.save(teacherRole));
			teacherDao.save(teacher);
			yield "%s register as a teacher successfully!"
			.formatted(register.username());
		}
		case "student" ->{
			var student=new Student(
					register.username(),
					passwordEncoder.encode(register.password()),
					register.email(),
					register.address(),
					StudentEducation.valueOf(register.studentEducation()));
			Role studentRole=getRoleByName("ROLE_STUDENT");
			student.addRole(roleDao.save(studentRole));
			studentDao.save(student);
			yield "%s register as a student successfully"
			.formatted(register.username());
		}
		default ->
			throw new IllegalArgumentException("Unexpected value: " + register.userType());
		};
		return returnString;
	}
	
	public Map<String,String> login(String username,String password){
		var auth=new UsernamePasswordAuthenticationToken(username, password);
		var authentication=authenticationManager
				.authenticate(auth);
		StringBuilder sb=authentication
				.getAuthorities()
				.stream()
				.map(GrantedAuthority::getAuthority)
				.map(r -> {
					StringBuilder s=new StringBuilder();
					s.append(r);
					return s;
				})
				.findAny().get();

		SecurityContextHolder.getContext().setAuthentication(authentication);
		return Map.of("username",authentication.getName(),
				"roles",sb.toString());
	}

}





