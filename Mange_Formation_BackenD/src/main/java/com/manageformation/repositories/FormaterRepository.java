package com.manageformation.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manageformation.entities.Formater;


public interface FormaterRepository extends JpaRepository<Formater, Integer>{
	  Optional<Formater> findByName(String name);
}
