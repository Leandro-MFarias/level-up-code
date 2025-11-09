import { Link } from "react-router";
import { RegisterForm } from "../_components/forms/registerForm";

export function RegisterPage() {
  return (
    <div className="relative h-screen text-zinc-300 md:static md:grid md:h-auto md:grid-cols-2 md:bg-zinc-800">
      {/* CONTAINER IMAGE */}
      <div className="absolute -z-10 flex h-screen items-center justify-center bg-[url(/code.png)] bg-no-repeat md:relative md:z-0">
        <div className="absolute inset-0 bg-black/90 md:bg-black/70"></div>

        <h1 className="invisible relative text-center text-4xl font-semibold md:visible md:text-white">
          Aprenda programação de forma leve, divertida e viciante
        </h1>
      </div>

      {/* CONTAINER FORM  */}
      <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-purple-600">LevelUpCode</h1>
        <RegisterForm />
        <Link to={"/"}>
          <p className="text-center">
            Já tem uma conta?
            <span className="font-semibold text-purple-500"> ENTRAR</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
