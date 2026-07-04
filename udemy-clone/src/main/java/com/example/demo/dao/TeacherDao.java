package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Teacher;

public interface TeacherDao extends JpaRepository<Teacher,Long>{
	Optional<Teacher> findByUsername(String username);
}
