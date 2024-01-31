package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Feedback;
import com.manageformation.repositories.FeedbackRepository;

@Service
public class FeedbackService {
	@Autowired
	private FeedbackRepository fr;
	
	public Feedback addFeedback(Feedback feedback) {
		return fr.save(feedback);
	}
	public List<Feedback> getAll(){
		return fr.findAll();
	}
	public List<Feedback> getById(int id){
		return fr.findByFormateurId(id);
	}

}
