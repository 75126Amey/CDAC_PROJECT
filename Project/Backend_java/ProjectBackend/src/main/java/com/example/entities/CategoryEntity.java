package com.example.entities;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="category")
@EqualsAndHashCode(onlyExplicitlyIncluded = true,callSuper = false)
public class CategoryEntity extends BaseEntity{
@EqualsAndHashCode.Include
@Column(unique = true)
String name;
String description;
@ManyToOne
@JoinColumn(name="parent_id")
private CategoryEntity parent;

@OneToMany(mappedBy="parent",cascade={CascadeType.ALL})
private Set<CategoryEntity> categories = new HashSet<>();
}
