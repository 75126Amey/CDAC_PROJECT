package com.example.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name="publisher")
public class PublisherEntity extends UserEntity{
String name;
@Column(length = 500)
String description;
@Column(length = 20,unique = true)
String phoneNo; 
}
