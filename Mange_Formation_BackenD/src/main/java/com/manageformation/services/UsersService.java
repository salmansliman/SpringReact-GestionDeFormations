package com.manageformation.services;


import jakarta.annotation.PostConstruct;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manageformation.entities.Formater;
import com.manageformation.entities.Formation;
import com.manageformation.entities.UserInfo;
import com.manageformation.repositories.FormaterRepository;
import com.manageformation.repositories.FormationRepository;
import com.manageformation.repositories.UserInfoRepository;


@Service
@Transactional
public class UsersService {

    @Autowired
    private UserInfoRepository repository;
    
    @Autowired
    private FormaterRepository fr;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private FormationRepository formationRepository;

    @PostConstruct
    public void add() {
    	UserInfo userInfo= new UserInfo();
    	userInfo.setId(1);
    	userInfo.setName("admin");
    	userInfo.setEmail("admin@admin.com");
    	userInfo.setPassword(passwordEncoder.encode("1234"));
    	userInfo.setRoles("ROLE_ADMIN");
    	repository.save(userInfo);
    	UserInfo userAssistant=new UserInfo();
    	userAssistant.setId(2);
    	userAssistant.setName("assistant");
    	userAssistant.setEmail("assistant@assistant.com");
    	userAssistant.setPassword(passwordEncoder.encode("1234"));
    	userAssistant.setRoles("ROLE_ASSISTANT");
    	repository.save(userAssistant);
    }
    
    public String addUser(UserInfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        try {
        repository.save(userInfo);
        }catch (DataIntegrityViolationException e) {
            return "Error: Email already exists. Please choose a different email.";
        }
        return "user added to system";
    }
    
    public String addFormaterInterne(Formater formater) {
    	formater.setPassword(passwordEncoder.encode(formater.getPassword()));
    	formater.setType("INTERNE");
    	formater.setRoles("ROLE_FORMATER");
    	try {
    	fr.save(formater);
    	}catch (DataIntegrityViolationException e) {
            return "Error: Email already exists. Please choose a different email.";
        }
    	return "Formater Interne added succesfuly";	
    }
    
    public String addFormaterExterne(Formater formater) {
    	formater.setPassword(passwordEncoder.encode(formater.getPassword()));
    	formater.setType("EXTERNE");
    	formater.setRoles("ROLE_FORMATER");
    	fr.save(formater);
    	return "Formater externe added succesfuly";
    }
    
    public String addAssistance(UserInfo userInfo) {
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        userInfo.setRoles("ROLE_ASSISTANT");
        try {
        repository.save(userInfo);
        }catch (DataIntegrityViolationException e) {
            return "Error: Email already exists. Please choose a different email.";
        }
        return "assistant added to system";
    }
    public String findRoleByEmail(String email) {
    	return repository.findRoleByEmail(email);
    }
    public void DeleteFormater(Formater formater) {
    	List <Formation> formations = formationRepository.findByFormater(formater);
    	for(Formation formation : formations) {
    		formation.setFormater(null);
    	}
    	try {
    	fr.delete(formater);
    	}catch (Exception e) {
    		System.out.println("errrror");
    	}
    }
    public String updateFormater(Formater formater) {
    	formater.setPassword(passwordEncoder.encode(formater.getPassword()));
    	formater.setRoles(formater.getRoles());
    	formater.setType(formater.getType());
    	fr.save(formater);
    	return "formater named "+formater.getName()+" updated";
    }
}
