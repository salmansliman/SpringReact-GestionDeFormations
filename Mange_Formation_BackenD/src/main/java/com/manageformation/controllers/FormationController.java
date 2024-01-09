package com.manageformation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Formation;
import com.manageformation.services.FormationService;

@RestController
@RequestMapping("/formation")
public class FormationController {

    @Autowired
    private FormationService service;
    
    @PostMapping("/newFormation")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewFormation(@RequestBody Formation formation) {
        return service.addFormation(formation);
    }
    
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome Formation";
    }
	
}
