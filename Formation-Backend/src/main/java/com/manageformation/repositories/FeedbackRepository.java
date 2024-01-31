package com.manageformation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manageformation.entities.Feedback;
import java.util.List;
import com.manageformation.entities.Formater;


public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	List<Feedback> findByFormateurId(int id);

}
