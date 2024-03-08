import React, { useState, useEffect } from 'react';

const EjercicioList = () => {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await fetch('/api/ejercicios/');
        const data = await response.json();
        setEjercicios(data);
        console.log(data); // <-- Aquí agregamos el console.log con los datos obtenidos
      } catch (error) {
        console.error('Error fetching ejercicios:', error);
      }
    };
    
    fetchEjercicios();
  }, []);

  return (
    <ul>
      {ejercicios.map((ejercicio) => (
        <li key={ejercicio._id}>
          <h2>{ejercicio.nombre}</h2>
          <p>{ejercicio.descripcion}</p>
          <p>Dificultad: {ejercicio.dificultad}</p>
        </li>
      ))}
    </ul>
  );
};

export default EjercicioList;
