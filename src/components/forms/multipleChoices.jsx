import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const schema = z.object({
  pergunta: z.string().min(5, "A pergunta é obrigatória"),
  opcoes: z.array(z.string().min(1)).min(2, "Mínimo de 2 opções"),
  respostaCorreta: z.string().min(1, "A resposta correta é obrigatória"),
});

export function FormMultipleChoices({ onNext, setSubmitRef }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { opcoes: ["", ""] },
  });

  const { fields, append } = useFieldArray({ control, name: "opcoes" });

  useEffect(() => {
    setSubmitRef.current = handleSubmit((data) => {
      onNext({
        ...data,
        tipo: "MULTIPLA_ESCOLHA",
      });
    });
  }, [handleSubmit, onNext, setSubmitRef]);

  return (
    <form className="flex w-full flex-col gap-4 self-start px-4">
      <h2 className="text-xl text-white">Pergunta: Multipla escolha</h2>
      <div className="flex flex-col">
        <label className="text-white">Pergunta:</label>
        <input
          {...register("pergunta")}
          className="rounded-sm border border-neutral-500 p-2"
        />
        <p className="h-4 text-red-600">{errors.pergunta?.message}</p>
      </div>

      <div className="flex flex-col w-full space-y-2">
        <p className="text-white">Opções:</p>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`opcoes.${index}`)}
              className="w-full rounded-sm border border-neutral-500 p-2"
            />
          </div>
        ))}
        <button type="button" onClick={() => append("")}>
          + Adicionar opção
        </button>
        <p className="h-4 text-red-600">{errors.opcoes?.message}</p>
      </div>

      <div className="flex flex-col">
        <label className="text-white">Resposta correta:</label>
        <input
          {...register("respostaCorreta")}
          className="rounded-sm border border-neutral-500 p-2"
        />
        <p className="h-4 text-red-600">{errors.respostaCorreta?.message}</p>
      </div>
    </form>
  );
}
