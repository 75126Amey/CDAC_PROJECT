package com.example.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name = "payment")
@EqualsAndHashCode(callSuper = false,onlyExplicitlyIncluded = true)
public class PaymentEntity extends BaseEntity{
@Column(length = 10,unique = true,nullable = false)
@EqualsAndHashCode.Include
private String transactionNo;
@Column(name="payment_type")
private PaymentType paymentType;
@Column(name="card_no")
private String cardNo;
private Long otp;
private Double amount;
}

