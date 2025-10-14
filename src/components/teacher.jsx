import { useState, useRef } from "react";
import { FormCompleteCode } from "./forms/completeCode";
import { FormMultipleChoices } from "./forms/multipleChoices";
import { FormCorrectOrder } from "./forms/correctOrder";

export function Teacher() {
  const [step, setStep] = useState(1);
  const [exerciseData, setExerciseData] = useState({});
  const formSubmitRef = useRef(null);

  function handleNextStep(formData) {
    setExerciseData((prev) => ({
      ...prev,
      [`step${step}`]: formData,
    }));
    setStep((prev) => prev + 1);
  }

  function handlePrev() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  async function handleSubmitAll(finalData) {
    const exercises = Object.values(exerciseData);

    // cria ou usa lista existente
    let listaId = finalData.listaId;

    if (!listaId && finalData.novaLista) {
      const listResponse = await fetch("/api/exercise-lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: finalData.novaLista,
          descricao: "Lista criada automaticamente",
        }),
      });

      const list = await listResponse.json();
      listaId = list.id;
    }

    // cria grupo automaticamente com próxima ordem
    const groupResponse = await fetch("/api/exercise-groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ordem: 1,
        listaId,
      }),
    });

    const group = await groupResponse.json();

    // cria os exercícios vinculados
    for (const ex of exercises) {
      await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...ex,
          grupoId: group.id, // ← id real do backend
        }),
      });
    }

    console.log("✅ Grupo e exercícios criados com sucesso!");
  }

  function handleNext() {
    if (formSubmitRef.current) {
      formSubmitRef.current();
    }
  }

  return (
    <div className="jusfice-content-center grid w-full grid-cols-[1fr_380px] gap-10 px-10 py-20">
      <div className="flex w-full flex-col items-center space-y-4 rounded-md border-2 border-neutral-700 py-6">
        <h3 className="text-center text-2xl text-white font-semibold">
          Criar Novo Exercício
        </h3>

        <div className="w-full flex-1">
          {step === 1 && (
            <FormCompleteCode
              onNext={handleNextStep}
              setSubmitRef={formSubmitRef}
            />
          )}
          {step === 2 && (
            <FormMultipleChoices
              onNext={handleNextStep}
              setSubmitRef={formSubmitRef}
            />
          )}
          {step === 3 && (
            <FormCorrectOrder
              onNext={handleSubmitAll}
              setSubmitRef={formSubmitRef}
            />
          )}
        </div>

        <div className="flex space-x-4">
          {step > 1 && (
            <button
              className="rounded-md bg-purple-600 px-6 py-1 text-white"
              onClick={handlePrev}
            >
              Voltar
            </button>
          )}
          {step < 3 ? (
            <button
              className="rounded-md bg-purple-600 px-6 py-1 text-white"
              onClick={handleNext}
            >
              Próximo
            </button>
          ) : (
            <button
              className="rounded-md bg-purple-600 px-6 py-1 text-white"
              onClick={() => formSubmitRef.current?.()}
            >
              Finalizar
            </button>
          )}
        </div>
      </div>

      <div className="rounded-md border-2 border-neutral-700 px-2 py-6">
        <p className="text-3xl font-semibold text-purple-500">
          Lista de Alunos
        </p>
      </div>
    </div>
  );
}
