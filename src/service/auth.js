import { api } from "./api";

export async function createAccount(data) {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function signIn(data) {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getMe() {
  const res = await api.get("/auth/me")
  return res.data
}

export async function getUsers() {
  const res = await api.get("/auth/users")
  return res.data
}