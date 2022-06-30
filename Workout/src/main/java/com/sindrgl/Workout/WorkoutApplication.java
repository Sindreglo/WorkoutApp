package com.sindrgl.Workout;

import com.sindrgl.Workout.domain.AppUser;
import com.sindrgl.Workout.service.AppUserService;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WorkoutApplication {
	public static void main(String[] args) {
		SpringApplication.run(WorkoutApplication.class, args);
	}

	@Bean
	CommandLineRunner run(AppUserService userService) {
		return args -> {
			userService.saveUser(new AppUser("Sindre Glomnes", "sindre", "1234"));
			userService.saveUser(new AppUser("Lisa Bambulyak", "lisa", "1234"));
			userService.saveUser(new AppUser("Andreas Vik", "soppen", "1234"));
			userService.saveUser(new AppUser("Håkon Haltbakk", "håkon", "1234"));
		};
	}
}

