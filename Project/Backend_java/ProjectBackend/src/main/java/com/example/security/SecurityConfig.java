package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity//to enable spring sec frmwork support
@Configuration //to tell SC , this is config class containing @Bean methods
@EnableMethodSecurity(prePostEnabled = true)

//To enable method level authorization support : pre n post authorization
public class SecurityConfig {
	//dep : custom jwt auth filter
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
	//dep : custom auth entry point
	@Autowired
	private CustomAuthenticationEntryPoint authEntry;
	
	
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
	{
		final String[] WHITE_LIST_URL = {
				"/user/login",
				"/user/register",
				"/products/view",
				"/users/signup",
				"/users/signin",
				"/v*/api-doc*/**",
				"/swagger-ui/**",
				"/user/getUserId/{email}",
				"/customer/register",
				"/user/checkEmail/{email}",
				"/covers/*.png",
				"/covers/*.jpg",
				"/covers/*.jpeg",
				"/files/*.epub",
				"/author/register",
				"/category",
				"/book/page/{pageNo}",
				"/book/{id}",
				"/book/review/{bookId}",
				"/author/image/photo/{id}",
				"/author/image/identification/{id}",
				"/book/search/keyword/{name}",
				"/book/search",
				"/excel/download/**",
				"/excel/download/author/reviews/{id}",
				"/category/books/{id}",
				"/proAuthor/details/{id}",
				"/proAuthor/image/{id}",
				"/book/page/trending/{pageNo}"
				};
		//URL based authorization rules
		http.cors(Customizer.withDefaults())
		//disable CSRF token generation n verification
		.csrf(AbstractHttpConfigurer::disable) 
		.exceptionHandling(e->e.authenticationEntryPoint(authEntry))
		.authorizeHttpRequests(req->req.requestMatchers(WHITE_LIST_URL).permitAll()
		// only required for JS clnts (react / angular) : for the pre flight requests
		.requestMatchers(HttpMethod.OPTIONS).permitAll()
		.requestMatchers("/publisher/register","/proAuthor/register","/category/add","/book/keyword/add","/book/add").hasAuthority("ADMIN")
		.requestMatchers("/order/make").hasAuthority("CUSTOMER")
		//.requestMatchers("/book/add").hasRole("AUTHOR")	
		.anyRequest().authenticated())
		//to tell spring sec : not to use HttpSession to store user's auth details
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		//inserting jwt filter before sec filter
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	
		return http.build();
	}
	
	//configure AuthMgr as a spring bean
	@Bean
	public AuthenticationManager authenticationManager
	(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
}
