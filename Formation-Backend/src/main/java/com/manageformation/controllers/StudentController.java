package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Student;
import com.manageformation.services.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController {
	@Autowired
	StudentService ss;
	
	@PostMapping("/new")
	public ResponseEntity<String> AddStudent(@RequestBody Student student) {
		return ss.addStudent(student);
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
	@GetMapping("/false")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
	public List<Student> findByStatueFalse(){
		return ss.getStudentsWithFalseStatue();
	}
	@GetMapping("/true")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT','ROLE_FORMATER')")
	public List<Student> findByStatueTrue(){
		return ss.getStudentsWithTrueStatue();
	}
	
	
}
