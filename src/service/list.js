import { api } from "./api";

export async function newList(data) {
  try {
    const res = await api.post("/admin/exercise/list", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getList(id) {
  try {
    const res = await api.get(`/admin/exercise/list/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
