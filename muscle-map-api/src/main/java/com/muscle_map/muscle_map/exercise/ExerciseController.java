package com.muscle_map.muscle_map.exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path="/api/v1/exercise")
public class ExerciseController {
    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getExercises(@RequestParam(required = false) String name) {
        if(name != null) {
            return exerciseService.getExerciseByName(name);
        }else{
            return exerciseService.getAllExercises();
        }
    }

    @PostMapping
    public ResponseEntity<Exercise> addExercise(@RequestBody Exercise exercise) {
        Exercise newExercise = exerciseService.addExercise(exercise);
        return new ResponseEntity<>(newExercise, HttpStatus.CREATED);
    }

}
