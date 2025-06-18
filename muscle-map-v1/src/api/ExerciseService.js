import axios from 'axios';

export async function addExercise(exercise){
    return await axios.post(process.env.REACT_APP_API_URL, exercise);
}

export async function getAllExercises(){
    return await axios.get(process.env.REACT_APP_API_URL);
}

export async function getExercise(name = ""){
    return await axios.get(`${process.env.REACT_APP_API_URL}?name=${name}`);
}