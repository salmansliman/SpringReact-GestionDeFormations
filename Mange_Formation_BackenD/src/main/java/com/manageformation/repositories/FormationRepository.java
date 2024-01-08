package com.manageformation.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manageformation.entities.Formation;

public interface FormationRepository extends JpaRepository<Formation, Integer> {
    Optional<Formation> findByNomFormation(String nomFormation);
}

