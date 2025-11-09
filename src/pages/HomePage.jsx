import { Journey } from "@/_components/journey";
import { NavBar } from "@/_components/navBar";

export function HomePage() {
  return (
    <div className="flex h-screen flex-col-reverse lg:flex-row">
      <NavBar />
      <Journey />
    </div>
  );
}
