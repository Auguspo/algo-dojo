// utils/fetchExercises.js
import axios from 'axios';


export async function fetchExercises() {
 try {
   const res = await axios.get('http://localhost:3000/api/ejercicios');
   return res.data;
 } catch (error) {
   console.error('Error fetching data:', error);
   throw error;
 }
}

export async function fetchExerciseById(id) {
 try {
   const res = await axios.get(`http://localhost:3000/api/ejercicios/${id}`);
   return res.data;
 } catch (error) {
   console.error('Error fetching data:', error);
   throw error;
 }
}

export async function createExercise(ejercicio) {
 try {
   const res = await axios.post('http://localhost:3000/api/ejercicios', ejercicio);
   return res.data;
 } catch (error) {
   console.error('Error creating exercise:', error);
   throw error;
 }
}

export async function updateExercise(id, ejercicio) {
 try {
   const res = await axios.put(`http://localhost:3000/api/ejercicios/${id}`, ejercicio);
   return res.data;
 } catch (error) {
   console.error('Error updating exercise:', error);
   throw error;
 }
}

export async function deleteExercise(id) {
 try {
   const res = await axios.delete(`http://localhost:3000/api/ejercicios/${id}`);
   return res.data;
 } catch (error) {
   console.error('Error deleting exercise:', error);
   throw error;
 }
}