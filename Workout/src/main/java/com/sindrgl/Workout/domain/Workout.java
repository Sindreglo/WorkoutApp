package com.sindrgl.Workout.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String exercise;
    private int weight;
    private int reps;
    private int date;
    private Long wo_fk;

    public Workout(String exercise, int weight, int reps, int date) {
        this.exercise = exercise;
        this.weight = weight;
        this.reps = reps;
        this.date = date;
    }
}
