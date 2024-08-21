package com.example.services;

import java.io.ByteArrayInputStream;

public interface ExcelServices {
ByteArrayInputStream bookReviewsByAuthor(Long id);
ByteArrayInputStream salesPerOrder();
ByteArrayInputStream salesPerBookForAuthor(Long id);
ByteArrayInputStream salesPerBookForPublisher(Long id);
}
