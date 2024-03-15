// utils/fetchExercises.js
export async function fetchExercises() {
  try {
    const res = await fetch('http://localhost:3000/api/ejercicios');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


  export async function fetchExerciseById  (id) {
    try {
      const res = await fetch(`http://localhost:3000/api/ejercicios/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 