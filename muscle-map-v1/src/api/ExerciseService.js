import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/exercise'

export async function addExercise(exercise){
    return await axios.post(API_URL, exercise);
}

export async function getAllExercises(){
    return await axios.get(API_URL);
}

export async function getExercise(name = ""){
    return await axios.get(`${API_URL}?name=${name}`);
}