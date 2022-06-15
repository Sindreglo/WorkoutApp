package com.sindrgl.Workout.service;

import com.sindrgl.Workout.domain.AppUser;
import com.sindrgl.Workout.domain.Role;
import com.sindrgl.Workout.domain.Workout;

import java.util.List;

public interface AppUserService {
    void saveWorkoutToUser(Workout workout, String username);
    List<Workout>getWorkouts(String username);
    AppUser saveUser(AppUser user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> getUsers();
}
