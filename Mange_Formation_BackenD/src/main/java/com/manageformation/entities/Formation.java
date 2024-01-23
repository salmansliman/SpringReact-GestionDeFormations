package com.manageformation.entities;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@JsonIgnore
	private Formater formater;
	@ManyToOne
	private Entreprise entreprise;
	@OneToMany(mappedBy = "formation")
	@JsonIgnore
	List <Student> students;
}
