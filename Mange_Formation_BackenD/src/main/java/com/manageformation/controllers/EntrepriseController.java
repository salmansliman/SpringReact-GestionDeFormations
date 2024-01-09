package com.manageformation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manageformation.entities.Entreprise;
import com.manageformation.services.EntrepriseService;

@RestController
@RequestMapping("/entreprise")
public class EntrepriseController {
	
	@Autowired
	private EntrepriseService Es;
	
	@PostMapping("/newEntreprise")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
	public String AddEntreprise(@RequestBody Entreprise entreprise) {
		return Es.addEntreprise(entreprise);
	}
	
	@GetMapping("/all")
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ASSISTANT')")
	public List<Entreprise> getEntreprises() {
		return Es.getEntreprises();
	}
	
	 @GetMapping("/welcome")
	 public String welcome() {
	       return "Welcome Entreprise";
	 }
	
}
