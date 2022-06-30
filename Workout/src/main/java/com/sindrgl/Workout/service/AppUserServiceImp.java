package com.sindrgl.Workout.service;
import com.sindrgl.Workout.domain.AppUser;
import com.sindrgl.Workout.repo.AppUserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class AppUserServiceImp implements AppUserService {
    private final AppUserRepo userRepo;

    @Override
    public List<AppUser> getUsers() {
        log.info("fetching users");
        return userRepo.findAll();
    }

    @Override
    public AppUser getUser(String username) {
        log.info("fetching user {}", username);
        return userRepo.findByUsername(username);
    }

    @Override
    public AppUser saveUser(AppUser user) {
        log.info("Saving new user {} to the database", user.getName());
        return userRepo.save(user);
    }
}
