import { useAuth } from "@/context/useUser";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const { user, isLoading, isError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      navigate("/", { replace: true });
    }
  }, [isLoading, user, isError, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  if (!user || isError) {
    return null;
  }

  return <Outlet />;
}
