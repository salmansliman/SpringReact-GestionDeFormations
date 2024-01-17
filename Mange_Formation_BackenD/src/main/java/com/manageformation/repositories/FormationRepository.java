package com.manageformation.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

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
}

