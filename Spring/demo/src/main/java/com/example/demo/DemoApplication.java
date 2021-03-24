package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
	ConfigurableApplicationContext context=	SpringApplication.run(DemoApplication.class, args);
	Employee e=context.getBean(Employee.class)
	e.show()
	}

}
