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
    public String acceptStudent(int id) {
		Student temp=sr.findById(id);
		temp.setName(temp.getName());
		temp.setEmail(temp.getEmail());
		temp.setStatue(true);
		temp.setFormation(temp.getFormation());
		sr.save(temp);
		return "student named "+temp.getName()+" accepted";
}
    public List<Student> getAllInFormation(Formation formation){
    	return sr.findByFormation(formation);
    }
    public void deleteStudent (Student student) {
    	sr.delete(student);
    }
    public String updateStudent(Student student) {
    	sr.save(student);
    	return "student named "+student.getName()+"updated";
    }
}
	

