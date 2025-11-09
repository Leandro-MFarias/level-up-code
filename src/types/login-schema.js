import z from "zod";

export const loginSchema = z.object({
  login: z.email().min(1, 'Campo obrigatório'),
  senha: z.string().min(1, 'Campo obrigatório')
})