package com.manageformation.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
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
	private List<Formation> formation;
}
