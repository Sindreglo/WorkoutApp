package com.sindrgl.Workout.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sindrgl.Workout.domain.*;
import com.sindrgl.Workout.service.AppUserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController @RequestMapping("/api")
@RequiredArgsConstructor @Slf4j
public class AppUserResource {
    private final AppUserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>>getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user")
    public ResponseEntity<AppUser>getUser(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        return ResponseEntity.ok().body(userService.getUser(getUserFromToken(getUserFromToken(authorizationHeader))));
    }

    @PostMapping("/addUser")
    public ResponseEntity<AppUser>addUser(@RequestBody AppUser user) {
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?>addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/exercise")
    public ResponseEntity<Exercise>saveExercise(@RequestBody Exercise exercise , @RequestHeader(name="Authorization") String token) {
        userService.saveExerciseToUser(exercise, getUserFromToken(token));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/exercise")
    public ResponseEntity<List<Exercise>>getExercise(@RequestHeader(name="Authorization") String token) {
        List<Exercise> exercises = userService.getExercises(getUserFromToken(token));
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @DeleteMapping("/user/exercise")
    public ResponseEntity<Exercise>removeExercise(@RequestBody Exercise exercise, @RequestHeader(name="Authorization") String token) {
        userService.removeExerciseFromUser(exercise, getUserFromToken(token));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/exercise/workout")
    public ResponseEntity<Exercise>saveWorkout(@RequestBody WorkoutToExercise workoutToExercise, @RequestHeader(name="Authorization") String token) {
        userService.saveWorkoutToExercise(workoutToExercise.getWorkout(),workoutToExercise.getExercise(),getUserFromToken(token));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/exercise/workout")
    public ResponseEntity<List<Workout>>getWorkouts(@RequestBody Exercise exercise, @RequestHeader(name="Authorization") String token) {
        List<Workout> workouts = userService.getWorkoutsFromExercise(exercise, getUserFromToken(token));
        return new ResponseEntity<>(workouts, HttpStatus.OK);
    }

    @DeleteMapping("/user/exercise/workout")
    public ResponseEntity<Exercise>removeWorkout(@RequestBody WorkoutToExercise workoutToExercise, @RequestHeader(name="Authorization") String token) {
        userService.removeWorkoutFromExercise(workoutToExercise.getWorkout(),workoutToExercise.getExercise(),getUserFromToken(token));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/exercise/workouts")
    public ResponseEntity<List<WorkoutExercise>>getAllWorkouts(@RequestHeader(name="Authorization") String token) {
        List<WorkoutExercise> workouts = userService.getAllWorkouts(getUserFromToken(token));
        return new ResponseEntity<>(workouts, HttpStatus.OK);
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                AppUser user = userService.getUser(username);
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10*60*1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception e) {
                response.setHeader("error", e.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", e.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    private String getUserFromToken(String token) {
        String authorizationHeader = token;
        String username = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                username = decodedJWT.getSubject();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return username;
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}

@Data
class WorkoutToExercise {
    private Workout workout;
    private Exercise exercise;
}
