package com.studi.OG_tickets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync

public class OgTicketsApplication {

	public static void main(String[] args) {

		SpringApplication.run(OgTicketsApplication.class, args);
	}

}
