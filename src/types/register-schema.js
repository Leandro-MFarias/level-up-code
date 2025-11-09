import z from "zod";

export const registerSchema = z
  .object({
    nomeCompleto: z.string().min(1, "Campo obrigatório"),
    email: z.email().min(1, "Campo obrigatório"),
    senha: z.string().min(1, "Campo obrigatório"),
    confirm: z.string().min(1, "As senhas precisam ser iguais"),
  })
  .refine((data) => data.senha === data.confirm, {
    message: "As senhas precisam ser iguais",
    path: ["confirm"],
  });
