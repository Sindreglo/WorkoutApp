package com.sindrgl.Workout.controller;

import com.sindrgl.Workout.model.LoginRequest;
import com.sindrgl.Workout.model.LoginResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/login")
@EnableAutoConfiguration
@CrossOrigin
public class LoginController {

    private static final Logger LOGGER = LogManager.getLogger(LoginController.class);

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.CREATED)
    public LoginResponse doLogin(final @RequestBody LoginRequest loginRequest){
        LOGGER.info("Logging in..." + loginRequest.getUsername());
        if(loginRequest.getUsername().equalsIgnoreCase("user")
                && loginRequest.getPassword().equalsIgnoreCase("pass")) {
            return new LoginResponse("Success");
        }
        return new LoginResponse("Fail");
    }

}
