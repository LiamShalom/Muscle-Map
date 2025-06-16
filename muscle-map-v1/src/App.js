import './App.css';
import { useState, useEffect } from 'react';
import { getAllExercises, getExercise } from './api/ExerciseService';
import MuscleDiagram from './MuscleDiagram'

function App() {
  const [data, setData] = useState({});
  const [exercises, setExercises] = useState([{}]);
  const [queries, setQueries] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [totals, setTotals] = useState({
    "traps": 0, "front_delts": 0, "rear_delts": 0, "triceps": 0, "biceps": 0, "forearms": 0,
    "pecs": 0, "upper_back": 0, "lats": 0, "abdominals": 0, "obliques": 0, "lower_back": 0,
    "glutes": 0, "quads": 0, "hamstrings": 0, "calves": 0, "hip_flexors": 0
  });


  const handleChange = (e, index) => {
    const newQueries = [...queries];
    newQueries[index] = e.target.value;
    setQueries(newQueries);

    const newExercises = [...exercises];
    newExercises[index] = {};
    setExercises(newExercises);

    filterSuggestions(e.target.value);
  }

  const handleSelect = (val) => {
    const newQueries = [...queries];
    newQueries[focusedIndex] = val;
    setQueries(newQueries);
    findWorkout(val)
  }

  const filterSuggestions = (query) => {
    const suggestions = data.map(exercise => exercise.name)
    suggestions.sort();
    if (query != null) {
      setFilteredSuggestions(suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())));
    }else{
      setFilteredSuggestions(suggestions)
    }

  }

  const addWorkout = () => {
    setExercises([...exercises, {}])
    setQueries([...queries, ""]);
    filterSuggestions(null);
  }

  const removeWorkout = () => {
    setExercises((exercises) => exercises.slice(0, -1))
    setQueries((queries) => queries.slice(0, -1));
  }

  const getExercises = async () => {
    try {
      const { data } = await getAllExercises();
      setData(data);
    } catch (error) {
      console.log(error)
    }
  }

  const findWorkout = async (name) => {
    try {
      const { data } = await getExercise(name);
      setData(data);
      const updated = [...exercises];
      if (data.length > 0) {
        updated[focusedIndex] = data[0];
      } else {
        updated[focusedIndex] = {};
      }
      setExercises(updated);
      getExercises();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getExercises();
  }, [])

  useEffect(() => {
    const muscleGroups = [
      "traps", "front_delts", "rear_delts", "triceps", "biceps", "forearms",
      "pecs", "upper_back", "lats", "abdominals", "obliques", "lower_back",
      "glutes", "quads", "hamstrings", "calves", "hip_flexors"
    ];

    const newTotals = {};

    for (const group of muscleGroups) {
      newTotals[group] = exercises.reduce((sum, exercise) => sum + (exercise[group] || 0), 0);
    }
    setTotals(newTotals);
  }, [exercises])

  return (
    <div className="App">
      <div className="content">
        <div className="left-column" style={{ position: 'relative' }}>
          <h1>Muscle Map</h1>
          <div className="addWorkout">
            <button
              onClick={addWorkout}
            >
              <span className="addWorkout_text"> Add Exercise</span>
              <span className="addWorkout_icon">
                +
              </span>
            </button>
            <button
              onClick={removeWorkout}
            >
              <span className="removeWorkout_text"> Remove Exercise</span>
              <span className="removeWorkout_icon">
                -
              </span>
            </button>
          </div>

          <div className="workouts">
            {exercises.map((_, index) => (
              <div className={`searchBox ${exercises[index].name === undefined ? "" : "found"}`} key={index}>
                {data && Array.isArray(data) && (
                  <div>
                    <div className='searchBar'>
                      <input
                        className={"exerciseInput"}
                        type="text"
                        value={queries[index] || ""}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Exercise"
                        onFocus={() => {
                          setTimeout(() => setFocusedIndex(index), 200);
                          filterSuggestions(queries[index] || null);
                        }}
                        onBlur={() => setTimeout(() => setFocusedIndex(null), 200)}
                      />
                      <button className="searchButton" onClick={() => findWorkout(queries[index], index)}>🔍</button>
                    </div>
                    <div>
                      {focusedIndex === index && (
                        <ul className="searchBar-suggestions">
                          {filteredSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="searchBar-suggestion"
                              onClick={() => handleSelect(suggestion)}>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
          <img
            src="images/muscle-diagram-white.png"
            alt="Muscle Diagram"
            style={{ width: '100%', height: '100%' }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <MuscleDiagram totals={totals} />
          </div>

        </div>
        <div className='legend'>
          <div id="color_range">
          </div>
          <div className="gradient-labels" >
            <div>
              Heavy Activation
            </div>
            <div style={{ marginTop: '17rem' }}>
              Moderate Activation
            </div>
            <div style={{ marginTop: '17rem' }}>
              Light Activation
            </div>
          </div>
        </div>





      </div>

    </div>
  );
}

export default App;
