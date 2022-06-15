package com.sindrgl.Workout.service;

import com.sindrgl.Workout.domain.AppUser;
import com.sindrgl.Workout.domain.Role;
import com.sindrgl.Workout.domain.Workout;
import com.sindrgl.Workout.repo.AppUserRepo;
import com.sindrgl.Workout.repo.RoleRepo;
import com.sindrgl.Workout.repo.WorkoutRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class AppUserServiceImpl implements AppUserService, UserDetailsService {
    private final AppUserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final WorkoutRepo workoutRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepo.findByUsername(username);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in database {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> { authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public void saveWorkoutToUser(Workout workout, String username) {
        log.info("Saving new workout {} to the database", workout);
        AppUser user = userRepo.findByUsername(username);
        user.getWorkouts().add(workout);
    }

    @Override
    public List<Workout> getWorkouts(String username) {
        AppUser user = userRepo.findByUsername(username);
        log.info(username);
        log.info(user.getId().toString());
        List<Workout> workouts = workoutRepo.findByUser(user.getId());
        log.info(workouts.toString());
        return workouts;
    }

    @Override
    public AppUser saveUser(AppUser user) {
        log.info("Saving new user {} to the database", user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        AppUser user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public AppUser getUser(String username) {
        log.info("fetching user {}", username);
        return userRepo.findByUsername(username);
    }

    @Override
    public List<AppUser> getUsers() {
        log.info("fetching users");
        return userRepo.findAll();
    }
}
