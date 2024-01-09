package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Entreprise;
import com.manageformation.repositories.EntrepriseRepository;

@Service
public class EntrepriseService {
	@Autowired
	EntrepriseRepository et;
	
	
	
	public String addEntreprise(Entreprise entreprise) {
		entreprise.setNomEntreprise(entreprise.getNomEntreprise());
		entreprise.setAdresseEntreprise(entreprise.getAdresseEntreprise());
		entreprise.setTelEntreprise(entreprise.getTelEntreprise());
		entreprise.setUrl(entreprise.getUrl());
		entreprise.setEmailEntreprise(entreprise.getEmailEntreprise());
		et.save(entreprise);
		return "Entreprise added";
	}
	public List<Entreprise> getEntreprises(){
		return et.findAll();
	}

}
