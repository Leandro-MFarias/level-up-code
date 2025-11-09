import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./routes/routes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/useUser";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
