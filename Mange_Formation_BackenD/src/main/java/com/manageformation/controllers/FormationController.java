package com.manageformation.controllers;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    @GetMapping("/all")
    public List<Formation> getAll(){
    	return service.getAll();
    }
	
    @PutMapping("/updateFormation")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public String updatFormation(@RequestBody Formation formation) {
    	return service.updateFormation(formation);
    }
    @GetMapping("/ville")
    public List<Formation> findFormationByVille(@RequestBody String ville){
    	return service.findFormationByVille(ville);
    }
    @PostMapping("/categorie")
    public List<Formation> findFormationByCategorie(@RequestBody String categorie){
    	return service.findFormationByCategorie(categorie);
    }
    @PostMapping("/date")
    public List<Formation> findFormationByDate(@RequestBody Date date){
    	return service.findFormationByDate(date);
    }
    @GetMapping("/datee")
    public List<Formation> findFormationByDateDebutBetween(@RequestBody Date date1, Date date2){
    	return service.findFormationByDateDebutBetween(date1, date2);
    }
    @GetMapping("/findFormation")
    public List<Formation> findFormation(@RequestBody Date date){
    	return service.findFormation(date);
    }
    
}
