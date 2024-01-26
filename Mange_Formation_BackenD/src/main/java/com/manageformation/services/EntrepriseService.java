package com.manageformation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Entreprise;
import com.manageformation.entities.Formation;
import com.manageformation.repositories.EntrepriseRepository;

@Service
public class EntrepriseService {
	
	@Autowired
	EntrepriseRepository et;
	@Autowired
	FormationService fr;
	
	public String addEntreprise(Entreprise entreprise) {
		entreprise.setNomEntreprise(entreprise.getNomEntreprise());
		entreprise.setAdresseEntreprise(entreprise.getAdresseEntreprise());
		entreprise.setTelEntreprise(entreprise.getTelEntreprise());
		entreprise.setUrl(entreprise.getUrl());
		entreprise.setEmailEntreprise(entreprise.getEmailEntreprise());
		et.save(entreprise);
		return "Entreprise added";
	}
	
	public List<Entreprise> getEntreprises() {
		return et.findAll();
	}
	public void DeleteEntreprise(Entreprise entreprise) {
		List<Formation> formations = fr.findFormationByEntreprise(entreprise);
		for(Formation formation:formations) {
			formation.setEntreprise(null);
		}
		et.delete(entreprise);
	}
	public String UpdateEntreprise(Entreprise entreprise) {
		et.save(entreprise);
		return entreprise.getNomEntreprise()+" updated";
	}
}
