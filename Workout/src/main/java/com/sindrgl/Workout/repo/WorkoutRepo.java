package com.sindrgl.Workout.repo;

import com.sindrgl.Workout.domain.Exercise;
import com.sindrgl.Workout.domain.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutRepo extends JpaRepository<Workout, Long> {
    @Query("from Workout w where w.workout_fk = :id")
    List<Exercise> findByExercise(@Param("id") Long id);
}
