package com.sindrgl.Workout.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int weight;
    private int reps;
    private Long workout_fk;

    public Workout(int weight, int reps) {
        this.weight = weight;
        this.reps = reps;
    }
}
