import { NavBar } from "../_components/navBar";
import { Teacher } from "../_components/teacher";

export function TeacherPage() {
  return (
    <div className="flex h-screen flex-col-reverse lg:flex-row">
      <NavBar />
      <Teacher />
    </div>
  )
}