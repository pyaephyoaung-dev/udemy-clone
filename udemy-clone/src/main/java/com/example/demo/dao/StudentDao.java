package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Student;

public interface StudentDao extends JpaRepository<Student,Long>{
	
	Optional<Student> findByUsername(String username);

}
