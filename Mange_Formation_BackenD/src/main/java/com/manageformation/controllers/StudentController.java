package com.manageformation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	@PostMapping("/accepte")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
	public String updateStudent(@RequestBody int id ) {
		return ss.acceptStudent(id);
	}
	@DeleteMapping("/delete")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
	public void deleteStudent(@RequestBody Student student) {
		ss.deleteStudent(student);
	}
	@PutMapping("/update")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
	public String updateStudent(Student student) {
		return ss.updateStudent(student);
	}
	
	
}
