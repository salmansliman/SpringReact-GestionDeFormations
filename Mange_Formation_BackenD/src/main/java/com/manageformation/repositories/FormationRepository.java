package com.manageformation.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.manageformation.entities.Entreprise;
import com.manageformation.entities.Formater;
import com.manageformation.entities.Formation;
import java.util.List;
import java.sql.Date;



public interface FormationRepository extends JpaRepository<Formation, Integer> {
    Optional<Formation> findByNomFormation(String nomFormation);
    Formation findById(int id);
    List<Formation> findByVille(String ville);
    List<Formation> findByCategorie(String categorie);
    List<Formation> findByDateDebutGreaterThanEqual(Date dateDebut);
    List<Formation> findByDateDebutBetween(Date dateDebut,Date dateEnd);
    List<Formation> findByFormater(Formater formater);
    List<Formation> findByEntreprise(Entreprise entreprise);
    
    @Query("SELECT f FROM Formation f WHERE f.ville IS NULL")
    List<Formation> findFormationsWithNullVille();
    List<Formation> findFormationByFormaterEmail(String email);
}

