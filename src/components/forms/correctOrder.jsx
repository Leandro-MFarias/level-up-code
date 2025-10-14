import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

const schema = z
  .object({
    pergunta: z.string().min(5, "A pergunta é obrigatória"),
    opcoes: z.array(z.string().min(1)).min(2, "Mínimo de 2 opções"),
    respostaCorreta: z.string().min(1, "A resposta é obrigatória"),
    listaId: z.string().optional(),
    novaLista: z.string().optional(),
  })
  .refine((data) => data.listaId || data.novaLista, {
    message: "Selecione uma lista existente ou crie uma nova",
    path: ["lista"],
  });

export function FormCorrectOrder({ onNext, setSubmitRef }) {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    fetch("/api/exercise-lists")
      .then((res) => res.json())
      .then(setListas);
  }, []);

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
        tipo: "VERDADEIRO_FALSO",
      });
    });
  }, [handleSubmit, onNext, setSubmitRef]);

  return (
    <form className="flex w-full flex-col gap-4 self-start px-4">
      <h2 className="text-xl text-white">Pergunta: Ordem correta</h2>
      <div className="flex flex-col">
        <label className="text-white">Pergunta:</label>
        <input
          {...register("pergunta")}
          className="w-full rounded-sm border border-neutral-500 p-2"
        />
        <p className="h-4 text-red-600">{errors.pergunta?.message}</p>
      </div>

      <div className="flex w-full flex-col space-y-2">
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
        <label>Resposta correta:</label>
        <input
          {...register("respostaCorreta")}
          className="w-full rounded-sm border border-neutral-500 p-2"
        />
        <p className="h-4 text-red-600">{errors.respostaCorreta?.message}</p>
      </div>

      <div className="mt-4">
        <p className="text-white">Selecione uma lista:</p>
        <select
          {...register("listaId")}
          className="w-full rounded-sm border border-neutral-500 p-2"
        >
          <option value="">-- Escolher --</option>
          {listas.map((l) => (
            <option key={l.id} value={l.id}>
              {l.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <p className="text-white">Ou crie uma nova lista:</p>
        <input
          {...register("novaLista")}
          placeholder="Nome da nova lista"
          className="w-full rounded-sm border border-neutral-500 p-2"
        />
      </div>

      {errors?.lista && (
        <p className="text-sm text-red-600">{errors.lista.message}</p>
      )}
    </form>
  );
}
