package com.example.dto;

import com.example.entities.PaymentType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenerateOtpDTO {
private String cardNo;
private Long orderId;
private PaymentType type;
private Long otp;
}
