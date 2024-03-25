import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const baseURL = process.env.BASE_URL || 'http://localhost:3000/api/ejercicios';

async function handleRequest(requestFunction) {
  try {
    const res = await requestFunction();
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function fetchExercises() {try{

  return handleRequest(() => axios.get(baseURL));
}catch(e){console.error('Error:', e);}
}

export async function fetchExerciseById(id) {
  return handleRequest(() => axios.get(`${baseURL}?id=${id}`));
}

export async function createExercise(ejercicio) {
  return handleRequest(() => axios.post(baseURL, ejercicio));
}

export async function updateExercise(id, ejercicio) {
  return handleRequest(() => axios.put(`${baseURL}?id=${id}`, ejercicio));
}

export async function deleteExercise(id) {
  return handleRequest(() => axios.delete(`${baseURL}?id=${id}`));
}
