import { api } from "./api";

export async function newExercise(data) {
  try {
    const res = await api.post("/admin/exercise", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getExercise(id) {
  const res = await api.get(`/admin/exercise/${id}`);
  return res.data;
}

export async function submitExercise({
  idUsuario,
  idExercicio,
  respostaUsuario,
}) {
  const response = await api.post("/exercise/submit", {
    idUsuario,
    idExercicio,
    respostaUsuario,
  });
  return response.data;
}
