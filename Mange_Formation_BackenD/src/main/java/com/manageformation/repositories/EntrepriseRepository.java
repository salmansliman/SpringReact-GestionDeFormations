package com.manageformation.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manageformation.entities.Entreprise;
import java.util.List;



public interface EntrepriseRepository extends JpaRepository<Entreprise, Integer>{
	Optional<Entreprise> findByNomEntreprise(String nomEntreprise);
	Entreprise  findByIdEntreprise(int idEntreprise);

}
