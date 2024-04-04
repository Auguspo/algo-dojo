import { ObjectId } from 'mongodb';
import { connectDb, disconnectDb } from 'src/connectionsDb/connectDb';

// Obtener todos los ejercicios
export const getAllEjercicios = async () => {
  try {
    const collection = await connectDb('ejercicios');
    const cursor = await collection.find({}); // Buscar todos los documentos en la colección
    const ejercicios = await cursor.toArray(); // Convertir los documentos a un array

    return ejercicios; // Devuelve los documentos como un array
  } catch (error) {
    throw new Error(`Error al obtener todos los ejercicios: ${error.message}`);
  } finally {
    await disconnectDb();
  }
};

// Obtener un ejercicio por ID
export const getEjercicioById = async (id) => {
  try {
    const collection = await connectDb('ejercicios');
    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(`Error al obtener el ejercicio por ID: ${error.message}`);
  } finally {
    await disconnectDb();
  }
};

// Crear un nuevo ejercicio
export const createEjercicio = async (ejercicioData) => {
  try {
    const collection = await connectDb('ejercicios');
    const result = await collection.insertOne(ejercicioData);
    return result;
  } catch (error) {
    throw new Error(`Error al crear un nuevo ejercicio: ${error.message}`);
  } finally {
    await disconnectDb();
  }
};

// Actualizar un ejercicio
export const updateEjercicio = async (id, ejercicioData) => {
  try {
    const collection = await connectDb('ejercicios');
    const objectId = new ObjectId(id); // Convertir el ID a ObjectId
    const result = await collection.updateOne(
      { _id: objectId }, // Filtrar el ejercicio por su ID
      { $set: ejercicioData } // Actualizar los datos del ejercicio
    );
    if (result.modifiedCount > 0) {
      return await getEjercicioById(id); // Devolver el ejercicio actualizado
    } else {
      throw new Error(
        'No se pudo actualizar el ejercicio. El ejercicio no existe o no se pudo modificar.'
      );
    }
  } catch (error) {
    throw new Error(`Error al actualizar el ejercicio: ${error.message}`);
  } finally {
    await disconnectDb();
  }
};

// Eliminar un ejercicio
export const deleteEjercicio = async (id) => {
  try {
    const collection = await connectDb('ejercicios');
    const objectId = new ObjectId(id); // Convertir el ID a ObjectId
    const result = await collection.deleteOne({ _id: objectId }); // Eliminar el documento
    if (result.deletedCount > 0) {
      return true; // Devolver true si se eliminó correctamente
    } else {
      throw new Error(
        'No se pudo eliminar el ejercicio. El ejercicio no existe o no se pudo eliminar.'
      );
    }
  } catch (error) {
    throw new Error(`Error al eliminar el ejercicio: ${error.message}`);
  } finally {
    await disconnectDb();
  }
};
