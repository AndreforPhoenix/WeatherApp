package com.azmet.firstspringbootapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FirstspringbootapiApplication {

	public static final String YEAR = "SELECT DISTINCT year FROM azmetdaily ORDER by year DESC";
	public static final String MONTH = "SELECT DISTINCT monthname FROM azmetdaily ORDER by year DESC";
	public static final String STATION = "SELECT DISTINCT station FROM azmetdaily ORDER by year DESC";
	public static final String RESPONSE = "SHOW COLUMNS FROM azmetdaily ORDER by year DESC";
	public static final String DATA = "SELECT year, monthname, station, atmaxDegF, atminDegF, atmeanDegF, date FROM azmetdaily ORDER BY year DESC";

	public static void main(String[] args) {
		SpringApplication.run(FirstspringbootapiApplication.class, args);
	}	
}
