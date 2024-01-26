package com.manageformation.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Formater extends UserInfo {
	private String type;
	private String competence;
	@OneToMany(mappedBy = "formater")
	@JsonIgnore
	List <Formation> formation;
}
