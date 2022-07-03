package com.sindrgl.Workout.service;

import com.sindrgl.Workout.domain.*;

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
    List<WorkoutExercise> getAllWorkouts(String username);
}
