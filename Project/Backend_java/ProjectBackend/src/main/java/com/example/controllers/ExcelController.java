package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dto.RegisterDTO;
import com.example.dto.SignInDTO;
import com.example.response.ApiResponseSuccess;
import com.example.response.ApiResponseToken;
import com.example.security.JwtUtils;
import com.example.services.ExcelServices;
import com.example.services.UserServices;

import jakarta.validation.constraints.Email;



@RestController
@RequestMapping("/excel")
@CrossOrigin
@Validated
public class ExcelController {
	 @Autowired
	  ExcelServices fileService;
	 @GetMapping("/download/author/reviews/{id}")
	  public ResponseEntity<Resource> getFile(@PathVariable Long id) {
	    String filename = "reviews.xlsx";
	    InputStreamResource file = new InputStreamResource(fileService.bookReviewsByAuthor(id));

	    return ResponseEntity.ok()
	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
	        .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	        .body(file);
	  }
	 @GetMapping("/download/admin/sales")
	  public ResponseEntity<Resource> getFileForAdmin() {
	    String filename = "salesreport.xlsx";
	    InputStreamResource file = new InputStreamResource(fileService.salesPerOrder());

	    return ResponseEntity.ok()
	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
	        .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	        .body(file);
	  }
	 @GetMapping("/download/author/sales/{id}")
	  public ResponseEntity<Resource> getFileForAuthor(@PathVariable Long id) {
	    String filename = "salesreport.xlsx";
	    InputStreamResource file = new InputStreamResource(fileService.salesPerBookForAuthor(id));

	    return ResponseEntity.ok()
	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
	        .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	        .body(file);
	  }
	 @GetMapping("/download/publisher/sales/{id}")
	  public ResponseEntity<Resource> getFileForPublisher(@PathVariable Long id) {
	    String filename = "salesreport.xlsx";
	    InputStreamResource file = new InputStreamResource(fileService.salesPerBookForPublisher(id));
	    return ResponseEntity.ok()
	        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
	        .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
	        .body(file);
	  }
}
