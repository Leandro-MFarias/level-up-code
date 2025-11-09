import { NavBar } from "@/_components/navBar";
import { Profile } from "@/_components/profile";

export function ProfilePage() {
  return (
    <div className="flex h-screen flex-col-reverse lg:flex-row">
      <NavBar />
      <Profile />
    </div>
  );
}
