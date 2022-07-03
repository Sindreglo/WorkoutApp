package com.sindrgl.Workout.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity @Data
@NoArgsConstructor @AllArgsConstructor
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String username;
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();
    @OneToMany(targetEntity = Exercise.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "exercise_fk", referencedColumnName = "id")
    private Collection<Exercise> exercises = new ArrayList<>();

    public AppUser(String name, String username, String password) {
        this.id = null;
        this.name = name;
        this.username = username;
        this.password = password;
    }
}
