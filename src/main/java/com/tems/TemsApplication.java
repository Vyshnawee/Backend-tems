package com.tems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class TemsApplication {

	public static void main(String[] args) {
        System.out.println("Hashed password" + new BCryptPasswordEncoder().encode("kumar123"));
		SpringApplication.run(TemsApplication.class, args);
	}

}
