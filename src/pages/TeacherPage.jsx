import { NavBar } from "../components/navBar";
import { Teacher } from "../components/teacher";

export function TeacherPage() {
  return (
    <div className="flex h-screen flex-col-reverse lg:flex-row">
      <NavBar />
      <Teacher />
    </div>
  )
}