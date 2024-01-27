package com.manageformation.services;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manageformation.entities.Entreprise;
import com.manageformation.entities.Formater;
import com.manageformation.entities.Formation;
import com.manageformation.repositories.FormationRepository;


@Service
@Transactional
public class FormationService {
	
	@Autowired
	private FormationRepository repository;
	
	   public String deleteFormationEnd() {
	        List<Formation> formations = repository.findAll();
	        LocalDate currentDate = LocalDate.now();

	        for (Formation formation : formations) {
	            Date endDate = formation.getDateEnd();
	            
	            if (endDate != null) {
	                LocalDate localEndDate = endDate.toLocalDate();

	                if (localEndDate.isBefore(currentDate)) {
	                    repository.delete(formation);
	                    return "Formation named: " + formation.getNomFormation() + " will be deleted";
	                }
	            }
	        }
	        return "all is in time";
	    }
	
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
		formation.setVille(temp.getVille());
		formation.setCategorie(temp.getCategorie());
		formation.setFormater(formation.getFormater());
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
	public List<Formation> findFormation(Date date){
    	List<Formation> formations = repository.findAll();
    	List <Formation> affiche =new ArrayList<Formation>();
    	for (Formation f:formations ) {
    		if((f.getDateDebut().before(date)) && (f.getDateEnd().after(date))) {
    			affiche.add(f);
    		}
    	}
    	return affiche;
    }
	public Formation getFormationById (int id) {
		return repository.findById(id);
	}
	public List<Formation> findFormationByEntreprise(Entreprise entreprise){
		return repository.findByEntreprise(entreprise);
	}
	public List<Formation> findFormationByFormater(Formater formater){
		return repository.findByFormater(formater);
		
	}
}
