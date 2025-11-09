import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../types/login-schema";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/auth-user";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function LoginForm() {
  const { mutateAsync: signIn } = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function handleForm(data) {
    try {
      const response = await signIn(data);
      const { token } = response;

      localStorage.setItem("token", token);

      // após o login, apenas recarrega a página
      // para o AuthContext buscar o user e redirecionar
      window.location.href = "/home";
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Erro ao fazer login!!!",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="flex w-[70%] flex-col items-center space-y-2 xl:w-[55%]"
    >
      <div className="flex w-full flex-col space-y-2">
        <label htmlFor="email" className="text-sm">
          E-mail
        </label>
        <input
          type="email"
          className="rounded-md border-2 border-neutral-700/80 bg-neutral-950 px-4 py-3 outline-none focus:border-purple-600"
          {...register("login")}
        />
        <p className="h-5 font-bold text-red-500/80">{errors.email?.message}</p>
      </div>

      <div className="flex w-full flex-col space-y-2">
        <label htmlFor="email" className="text-sm">
          Senha
        </label>
        <input
          type="password"
          className="rounded-md border-2 border-neutral-700/80 bg-neutral-950 px-4 py-3 outline-none focus:border-purple-600"
          {...register("senha")}
        />
        <p className="h-5 font-bold text-red-500/80">{errors.senha?.message}</p>
      </div>
      <button
        type="submit"
        className="w-[80%] cursor-pointer rounded-xl bg-purple-700 py-3 font-semibold transition duration-150 ease-in hover:bg-purple-600"
      >
        {isSubmitting ? "ENTRANDO.." : "ENTRAR"}
      </button>
    </form>
  );
}
