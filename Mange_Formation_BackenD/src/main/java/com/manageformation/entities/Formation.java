package com.manageformation.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Formation {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	private String nomFormation;
	private Integer nbrHeures;
	private Double cout;
	private String objectifs;
	private String progammeDetails;
	private Date dateDebut;
	private Date dateEnd;
	private String ville;
	private String categorie;
	@ManyToOne
	private Formater formater;
	@ManyToOne
	private Entreprise entreprise;
	
}
