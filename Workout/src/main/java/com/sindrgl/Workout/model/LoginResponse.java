package com.sindrgl.Workout.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginResponse {

    final private String loginStatus;

    public LoginResponse(@JsonProperty("loginStatus")  String loginStatus) {
        this.loginStatus = loginStatus;
    }

    @JsonProperty("loginStatus")
    public String getLoginStatus() {
        return loginStatus;
    }
}
