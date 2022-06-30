package com.sindrgl.Workout.service;

import com.sindrgl.Workout.domain.AppUser;

import java.util.List;

public interface AppUserService {
    List<AppUser> getUsers();
    AppUser getUser(String username);
    AppUser saveUser(AppUser user);
}
