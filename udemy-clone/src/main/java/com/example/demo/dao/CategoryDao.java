package com.example.demo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Category;

public interface CategoryDao extends JpaRepository<Category,Long>{
	Optional<Category> findByCategoryName(String categoryName);
}
