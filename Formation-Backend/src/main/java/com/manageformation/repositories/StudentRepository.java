package com.manageformation.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manageformation.entities.Student;
import com.manageformation.entities.Formation;



public interface StudentRepository extends JpaRepository<Student, Integer> {
	Optional<Student> findByName(String name);
	List<Student> findByFormation(Formation formation);
	Student findById(int id);
	List<Student> findByStatueFalse();
	List<Student> findByStatueTrue();
	List<Student> findByFormationId(int id);
}
