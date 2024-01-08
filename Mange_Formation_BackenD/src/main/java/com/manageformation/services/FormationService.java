package com.manageformation.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manageformation.entities.Formation;
import com.manageformation.repositories.FormationRepository;

@Service
public class FormationService {
	
	@Autowired
	private FormationRepository repository;
	
    public String addFormation(Formation formation) {
    	formation.setNomFormation(formation.getNomFormation());
    	formation.setNbrHeures(formation.getNbrHeures());
    	formation.setCout(formation.getCout());
    	formation.setObjectifs(formation.getObjectifs());
    	formation.setProgammeDetails(formation.getProgammeDetails());
        repository.save(formation);
        return "formation added";
    }


}
