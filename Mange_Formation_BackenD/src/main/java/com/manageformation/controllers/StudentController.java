package com.manageformation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Student;
import com.manageformation.services.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {
	@Autowired
	StudentService ss;
	
	@PostMapping("/new")
	public String AddStudent(@RequestBody Student student) {
		return ss.AddStudent(student);
	}
	@PostMapping("/update")
	 @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String updateStudent(@RequestBody int id ) {
		return ss.updateStudent(id);
	}
}
