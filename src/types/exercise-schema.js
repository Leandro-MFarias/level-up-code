import z from "zod";

export const exerciseSchema = z
  .object({
    listaId: z.string().min(1, "Campo obrigatório"),
    pergunta: z.string().min(4, "Campo obrigatório"),
    respostaCorreta: z.string().min(1, "Campo obrigatório"),
    tipo: z.enum(["MULTIPLA_ESCOLHA", "VERDADEIRO_FALSO", "PREENCHER_ESPACO"]),
    alternativas: z
      .array(
        z.object({
          value: z.string().min(1, "Campo obrigatório"),
        }),
      )
      .min(2, "Você precisa adicionar pelo menos 2 opções"),
  })
  .refine(
    (data) =>
      data.alternativas.some(
        (opt) =>
          opt.value.trim().toLowerCase() ===
          data.respostaCorreta.trim().toLowerCase(),
      ),
    {
      message: "A resposta correta deve estar entre as opções",
      path: ["respostaCorreta"],
    },
  );
