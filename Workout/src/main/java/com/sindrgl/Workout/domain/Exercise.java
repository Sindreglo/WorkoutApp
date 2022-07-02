package com.sindrgl.Workout.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Long exercise_fk;
    @OneToMany(targetEntity = Workout.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "workout_fk", referencedColumnName = "id")
    private Collection<Workout> workouts = new ArrayList<>();

    public Exercise(String name) {
        this.name = name;
    }
}
