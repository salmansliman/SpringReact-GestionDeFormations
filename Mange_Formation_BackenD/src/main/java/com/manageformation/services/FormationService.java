package com.manageformation.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.manageformation.entities.Formation;
import com.manageformation.repositories.FormationRepository;

@Service
public class FormationService {
	
	@Autowired
	private FormationRepository repository;
	
    public String addFormation(Formation formation) {
        repository.save(formation);
        return "formation added";
    }
    public String updateFormation(Formation formation) {
		Formation temp=repository.findById(formation.getId());
		formation.setNomFormation(temp.getNomFormation());
		formation.setNbrHeures(temp.getNbrHeures());
		formation.setCout(temp.getCout());
		formation.setObjectifs(temp.getObjectifs());
		formation.setProgammeDetails(temp.getProgammeDetails());
		formation.setDateDebut(temp.getDateDebut());
		formation.setDateEnd(temp.getDateEnd());
		formation.setVille(temp.getVille());
		formation.setCategorie(temp.getCategorie());
		repository.save(formation);
		return "formation updated";
}
	public List<Formation> getAll() {
		return repository.findAll();	
	}
	public List<Formation> findFormationByVille(String ville){
		return repository.findByVille(ville);
	}
	public List<Formation> findFormationByCategorie(String categorie){
		return repository.findByCategorie(categorie);
	}
    public List<Formation> findFormationByDate(Date date){
    	return repository.findByDateDebutGreaterThanEqual(date);
    }
    public List<Formation> findFormationByDateDebutBetween(Date dateDebut,Date dateEnd){
    	return repository.findByDateDebutBetween(dateDebut, dateEnd);
    }
}
