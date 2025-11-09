import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../types/register-schema";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/auth-user";
import { useNavigate } from "react-router";

export function RegisterForm() {
  const { mutateAsync: createAccount } = useRegister();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function handleForm(data) {
    try {
      await createAccount(data);
      navigate("/");
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="flex w-[70%] flex-col items-center space-y-3 xl:w-[55%]"
    >
      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm">Nome e Sobrenome</label>
        <input
          type="text"
          className="rounded-md border-2 border-neutral-700/80 bg-neutral-950 px-4 py-3 outline-none focus:border-purple-600"
          {...register("nomeCompleto")}
        />
        <p className="h-4 pl-1 font-bold text-red-500/80">
          {errors.nome?.message}
        </p>
      </div>

      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm">E-mail</label>
        <input
          type="email"
          className="rounded-md border-2 border-neutral-600/60 bg-neutral-950 px-4 py-3 outline-none focus:border-purple-600"
          {...register("email")}
        />
        <p className="h-4 pl-1 font-bold text-red-500/80">
          {errors.email?.message}
        </p>
      </div>

      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm">Senha</label>
        <input
          type="password"
          className="rounded-md border-2 border-neutral-600/60 bg-neutral-950 px-4 py-3 outline-none focus:border-purple-600"
          {...register("senha")}
        />
        <p className="h-4 pl-1 font-bold text-red-500/80">
          {errors.senha?.message}
        </p>
      </div>

      <div className="flex w-full flex-col space-y-1">
        <label className="text-sm">Confirmar senha</label>
        <input
          type="password"
          className="rounded-md border-2 border-neutral-600/60 bg-neutral-950 px-4 py-3 outline-none focus:border-purple-600"
          {...register("confirm")}
        />
        <p className="h-4 pl-1 font-bold text-red-500/80">
          {errors.confirm?.message}
        </p>
      </div>

      <button
        type="submit"
        className="mt-2 w-[80%] cursor-pointer rounded-xl bg-purple-700 py-3 font-semibold transition duration-150 ease-in hover:bg-purple-600"
      >
        {isLoading ? "Enviando.." : "Cadastrar"}
      </button>
    </form>
  );
}
