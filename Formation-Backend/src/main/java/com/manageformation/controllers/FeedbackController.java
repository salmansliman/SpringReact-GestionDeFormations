package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Feedback;
import com.manageformation.entities.Formation;
import com.manageformation.services.FeedbackService;

@RestController
@RequestMapping("/feedback")
@CrossOrigin("*")
public class FeedbackController {
	@Autowired
	private FeedbackService fs;
	
    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public List<Feedback>findAll(){
    	return fs.getAll();
    }
    @PostMapping("/add")
    public Feedback addNewFeedback(@RequestBody Feedback feedback) {
        return fs.addFeedback(feedback);
    }
    @GetMapping("/id")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public List<Feedback>findByid(@RequestBody int id){
    	return fs.getById(id);
    }
}
