import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProfilePage } from "../pages/ProfilePage";
import { ExercisesPage } from "../pages/ExercisesPage";
import { TeacherPage } from "../pages/TeacherPage";
import { ProtectedRoute } from "@/_components/protectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/exercises/:id", element: <ExercisesPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/teacher", element: <TeacherPage /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
