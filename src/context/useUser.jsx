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

  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const decoded = decodeToken(token);
        const userId = decoded?.id;
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const response = await api.get(`/auth/users/${userId}`);
        setUser(response.data);

        // 🔥 Se o usuário estiver logado e na página de login, redireciona manualmente
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

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
