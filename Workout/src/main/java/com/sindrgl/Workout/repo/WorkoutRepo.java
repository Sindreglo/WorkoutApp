package com.sindrgl.Workout.repo;

import com.sindrgl.Workout.domain.Exercise;
import com.sindrgl.Workout.domain.Workout;
import com.sindrgl.Workout.domain.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutRepo extends JpaRepository<Workout, Long> {
    @Query("from Workout w where w.workout_fk = :id")
    List<Exercise> findByExercise(@Param("id") Long id);

    @Query("SELECT new com.sindrgl.Workout.domain.WorkoutExercise(w.weight, w.reps, e.name) FROM Workout w, Exercise e, AppUser u WHERE u.username= :username AND u.id = e.exercise_fk AND e.id = w.workout_fk")
    List<WorkoutExercise> findAllByUser(@Param("username") String username);
}
