package com.sindrgl.Workout;

import com.sindrgl.Workout.domain.AppUser;
import com.sindrgl.Workout.domain.Role;
import com.sindrgl.Workout.service.AppUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class WorkoutApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkoutApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(AppUserService userService) {
		return arg -> {
			userService.saveRole(new Role(null, "ROLE_USER"));
			userService.saveRole(new Role(null, "ROLE_MANAGER"));
			userService.saveRole(new Role(null, "ROLE_ADMIN"));
			userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

			userService.saveUser(new AppUser("John Travolta", "john", "1234"));
			userService.saveUser(new AppUser("Will Smith", "will", "1234"));
			userService.saveUser(new AppUser("Jim Carry", "jim", "1234"));
			userService.saveUser(new AppUser("Arnold Schwarzenegger", "arnold", "1234"));

			userService.addRoleToUser("john", "ROLE_USER");
			userService.addRoleToUser("john", "ROLE_MANAGER");
			userService.addRoleToUser("will", "ROLE_USER");
			userService.addRoleToUser("jim", "ROLE_USER");
			userService.addRoleToUser("arnold", "ROLE_SUPER_ADMIN");
			userService.addRoleToUser("arnold", "ROLE_ADMIN");
			userService.addRoleToUser("arnold", "ROLE_USER");
		};
	}
}
