package com.manageformation.controllers;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Formater;
import com.manageformation.entities.Formation;
import com.manageformation.entities.Student;
import com.manageformation.services.FormationService;
import com.manageformation.services.StudentService;

@RestController
@RequestMapping("/formation")
@CrossOrigin("*")
public class FormationController {

    @Autowired
    private FormationService service;
    
    @Autowired
    private StudentService studentService;
    
    @PostMapping("/newFormation")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String addNewFormation(@RequestBody Formation formation) {
        return service.addFormation(formation);
    }
    
    @GetMapping("/null")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public List<Formation>findFormationsWithNullVille(){
    	return service.findFormationsWithNullVille();
    }
    
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome Formation";
    }
    @GetMapping("/all")
    public List<Formation> getAll(){
    	return service.getAll();
    }
    @DeleteMapping("/DeleteById")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public String deleteFormationById(@RequestBody int id) {
    	return service.deleteFormationById(id);
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
   
    @GetMapping("/inscrit")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public List<Student> getStudentInscrit(@RequestBody Formation formation){
    	return studentService.getAllInFormation(formation);
    }
    
    @GetMapping("/formaterFormation")
    public List<Formation> getFormationByFormater(@RequestBody Formater formater){
    	return service.findFormationByFormater(formater);
    }
    
    @GetMapping("/refresh")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
    public String deleteFormationEnd() {
    	return service.deleteFormationEnd();
    }
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = service.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable int id) {
        Formation formation = service.getFormationById(id);

        if (formation != null) {
            return new ResponseEntity<>(formation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/FormationEmail")
    public List<Formation> findFormationByEmail(@RequestParam String email) {
        return service.getFormationByEmail(email);
    }
}
