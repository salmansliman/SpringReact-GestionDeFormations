package com.manageformation.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Entreprise {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idEntreprise;
	private String nomEntreprise;
	private String adresseEntreprise;
	private String telEntreprise;
	private String url;
	private String emailEntreprise;
	@OneToMany(mappedBy = "entreprise")
	@JsonIgnore
	List <Formation> formation;

}
