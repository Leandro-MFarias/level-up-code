import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProfilePage } from "../pages/ProfilePage";
import { ExercisesPage } from "../pages/ExercisesPage";
import { TeacherPage } from "../pages/TeacherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/home",
    element: <HomePage /> 
  },
  {
    path: "/exercises",
    element: <ExercisesPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/teacher",
    element: <TeacherPage />
  },
])

export function AppRoutes() {
  return (
    <RouterProvider router={router} />
  )
}