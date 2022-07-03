package com.sindrgl.Workout.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WorkoutExercise {
    int weight;
    int reps;
    String exercise;
}
