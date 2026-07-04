package com.example.demo.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public record CourseLesson(
		String lessonName,
		String lessonLinked) {

}
