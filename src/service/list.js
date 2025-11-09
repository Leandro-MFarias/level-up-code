import { api } from "./api";

export async function newList(data) {
  try {
    const res = await api.post("/admin/exercise/list", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getList() {
  try {
    const res = await api.get("/admin/exercise/list");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
