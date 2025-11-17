import { api } from "@/service/api";
import { createContext, useContext, useEffect, useState } from "react";

function decodeToken(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function reloadUser() {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decoded = decodeToken(token);

      const userId = decoded?.id;

      const response = await api.get(`/auth/users/${userId}`);
      setUser(response.data);

      if (window.location.pathname === "/") {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    reloadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isError, setUser, reloadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
