package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formation;
import com.manageformation.entities.Student;
import com.manageformation.repositories.FormationRepository;
import com.manageformation.repositories.StudentRepository;

@Service
public class StudentService {
	@Autowired
	StudentRepository sr;
	@Autowired
	FormationRepository fr;
	
	public String AddStudent(Student student) {
		try {
		student.setStatue(false);
		sr.save(student);
		}catch (DataIntegrityViolationException e) {
            return "Error: Email already exists. Please choose a different email.";
        }
		return "student added";
	}
	public Student getStudentById(int id) {
		return sr.findById(id);
	}
    public String updateStudent(int id) {
		Student temp=sr.findById(id);
		temp.setName(temp.getName());
		temp.setEmail(temp.getEmail());
		temp.setPassword(temp.getPassword());
		temp.setStatue(true);
		temp.setFormation(temp.getFormation());
		sr.save(temp);
		return "student named "+temp.getName()+" updated";
}
    public List<Student> getAllInFormation(Formation formation){
    	return sr.findByFormation(formation);
    }
}
	

