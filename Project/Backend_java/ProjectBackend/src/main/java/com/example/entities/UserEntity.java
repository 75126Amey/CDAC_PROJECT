package com.example.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="user")
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(callSuper = false,onlyExplicitlyIncluded = true)
public class UserEntity extends BaseEntity{
@Column(unique = true,nullable = false)
@EqualsAndHashCode.Include
String email;
@Column(nullable = false)
String password;
@Enumerated(value = EnumType.STRING)
@Column(nullable = false)
Role role;
}
