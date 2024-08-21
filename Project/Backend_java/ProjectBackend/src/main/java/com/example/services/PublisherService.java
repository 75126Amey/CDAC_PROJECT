package com.example.services;

import java.util.List;

import com.example.dto.PublisherRegisterDTO;
import com.example.dto.UniversalDTO;
import com.example.entities.OrderEntity;

public interface PublisherService {

public String registerPublisher(PublisherRegisterDTO user);
double getMonthlyOverallSalesForPublisher();
double getDailyOverallSalesForPublisher();
UniversalDTO getLast7DaysDataForPublisher();
UniversalDTO getPublisherDetails();
}
