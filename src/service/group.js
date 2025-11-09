import { api } from "./api";

export async function newGroup(data) {
  try {
    const res = await api.post("/admin/exercise/group", data)
    return res.data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}