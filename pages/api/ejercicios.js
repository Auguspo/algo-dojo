import {
  getAllEjercicios,
  getEjercicioById,
  createEjercicio,
  updateEjercicio,
  deleteEjercicio,
} from "./controllers/ejercicioController";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        if (id) {
          const ejercicio = await getEjercicioById(id);
          if (!ejercicio) {
            return res.status(404).json({ error: "Ejercicio no encontrado" });
          }
          return res.status(200).json(ejercicio);
        } else {
          const ejercicios = await getAllEjercicios();
          return res.status(200).json(ejercicios);
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const ejercicio = await createEjercicio(req.body);
        res.status(201).json(ejercicio);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query.id ? { id: req.query.id } : req.query; // Obtener el ID del ejercicio de la URL
        const ejercicioData = req.body; // Obtener los datos actualizados del ejercicio del cuerpo de la solicitud
        if (!id) {
          return res
            .status(400)
            .json({ message: "Se requiere el ID del ejercicio" });
        }
        const ejercicioActualizado = await updateEjercicio(id, ejercicioData); // Actualizar el ejercicio

        res.status(200).json(ejercicioActualizado); // Devolver el ejercicio actualizado
      } catch (error) {
        res.status(500).json({ error: error.message }); // Manejar errores
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query.id ? { id: req.query.id } : req.query; // 
        if (!id) {
          return res
            .status(400)
            .json({ message: "Se requiere el ID del ejercicio" });
        }
        const ejercicioEliminado = await deleteEjercicio(id);
        if (!ejercicioEliminado) {
          return res.status(404).json({ message: "Ejercicio no encontrado" });
        }
        res.status(200).json({ message: "Ejercicio eliminado" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ message: "Método no permitido" });
  }
}