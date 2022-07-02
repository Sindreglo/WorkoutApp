package com.sindrgl.Workout.service;

import com.sindrgl.Workout.domain.AppUser;
import com.sindrgl.Workout.domain.Exercise;
import com.sindrgl.Workout.domain.Role;
import com.sindrgl.Workout.domain.Workout;

import java.util.List;

public interface AppUserService {
    AppUser saveUser(AppUser user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> getUsers();
    void saveExerciseToUser(Exercise exercise, String username);
    void removeExerciseFromUser(Exercise exercise, String username);
    List<Exercise>getExercises(String username);
    void saveWorkoutToExercise(Workout workout, Exercise exercise, String username);
    void removeWorkoutFromExercise(Workout workout, Exercise exercise, String username);
    List<Workout>getWorkoutsFromExercise(Exercise exercise, String username);
    List<Workout>getAllWorkouts(String username);
}
