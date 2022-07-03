package com.sindrgl.Workout.repo;

import com.sindrgl.Workout.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepo extends JpaRepository<Exercise, Long> {
    @Query("from Exercise e where e.exercise_fk = :id")
    List<Exercise> findByUser(@Param("id") Long id);

    @Query("From Exercise e where e.exercise_fk = :id and e.name = :name")
    Exercise findByUserAndName(@Param("id") Long id, @Param("name") String name);
}
