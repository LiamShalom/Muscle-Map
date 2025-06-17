package com.muscle_map.muscle_map.exercise;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="exercises")
public class Exercise {
    @Id
    @Column(name = "name", unique = true, nullable = false)
    private String name;
    private int traps;
    private int front_delts;
    private int rear_delts;
    private int triceps;
    private int biceps;
    private int forearms;
    private int pecs;
    private int upper_back;
    private int lats;
    private int abdominals;
    private int obliques;
    private int lower_back;
    private int glutes;
    private int quads;
    private int hamstrings;
    private int calves;
    private int hip_flexors;

    public Exercise() {}

    public Exercise(String name, int traps, int front_delts, int rear_delts, int triceps, int biceps, int forearms, int pecs, int upper_back, int lats, int abdominals, int obliques, int lower_back, int glutes, int quads, int hamstrings, int calves, int hip_flexors) {
        this.name = name;
        this.traps = traps;
        this.front_delts = front_delts;
        this.rear_delts = rear_delts;
        this.triceps = triceps;
        this.biceps = biceps;
        this.forearms = forearms;
        this.pecs = pecs;
        this.upper_back = upper_back;
        this.lats = lats;
        this.abdominals = abdominals;
        this.obliques = obliques;
        this.lower_back = lower_back;
        this.glutes = glutes;
        this.quads = quads;
        this.hamstrings = hamstrings;
        this.calves = calves;
        this.hip_flexors = hip_flexors;
    }

    public String getName() {
        return name;
    }

    public int getTraps() {
        return traps;
    }

    public int getFront_delts() {
        return front_delts;
    }

    public int getRear_delts() {
        return rear_delts;
    }

    public int getTriceps() {
        return triceps;
    }

    public int getBiceps() {
        return biceps;
    }

    public int getForearms() {
        return forearms;
    }

    public int getPecs() {
        return pecs;
    }

    public int getUpper_back() {
        return upper_back;
    }

    public int getLats() {
        return lats;
    }

    public int getAbdominals() {
        return abdominals;
    }

    public int getObliques() {
        return obliques;
    }

    public int getLower_back() {
        return lower_back;
    }

    public int getGlutes() {
        return glutes;
    }

    public int getQuads() {
        return quads;
    }

    public int getHamstrings() {
        return hamstrings;
    }

    public int getCalves() {
        return calves;
    }

    public int getHip_flexors() {return hip_flexors;}
}
