package com.manageformation.services;


import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formater;
import com.manageformation.entities.UserInfo;
import com.manageformation.repositories.FormaterRepository;
import com.manageformation.repositories.UserInfoRepository;


@Service
public class UsersService {

    @Autowired
    private UserInfoRepository repository;
    
    @Autowired
    private FormaterRepository fr;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        repository.save(userInfo);
        return "user added to system";
    }
    
    public String addFormaterInterne(Formater formater) {
    	formater.setPassword(passwordEncoder.encode(formater.getPassword()));
    	formater.setType("INTERNE");
    	formater.setRoles("ROLE_FORMATER");
    	fr.save(formater);
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
        repository.save(userInfo);
        return "assistant added to system";
    }
}
