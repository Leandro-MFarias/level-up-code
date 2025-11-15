import { Link, useParams } from "react-router";
import trophy from "../assets/trophy.svg";
import { IoClose } from "react-icons/io5";
import { useExercise } from "@/hooks/useExercise";
import { useSubmitExercise } from "@/hooks/useExercise";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/useUser";

export function ExercisesPage() {
  const { id } = useParams();
  const { data: exercise, isLoading } = useExercise(id);
  const { mutateAsync: submitExercise, isPending } = useSubmitExercise();
  const { user } = useAuth();

  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
      </div>
    );
  }

  function formater(formatar) {
    return formatar.replace("_", " ");
  }

  async function handleSubmit() {
    if (!selected) return;
    try {
      const data = await submitExercise({
        idUsuario: user.id,
        idExercicio: id,
        respostaUsuario: selected,
      });

      console.log(data);

      if (data.respostaCorreta) {
        setIsCorrect(true);
        setFeedback(`✅ ${data.menssagem}`);
      } else {
        setIsCorrect(false);
        setFeedback(`❌ ${data.menssagem}`);
      }
    } catch (error) {
      console.error(error);
      setIsCorrect(null);
      setFeedback("Erro ao enviar resposta ou acesso negado (403).");
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-16 overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-10">
        <Link to={"/home"}>
          <IoClose className="text-5xl" />
        </Link>
        <img src={trophy} alt="trofeu" />
      </div>

      <div className="flex h-[50vh] flex-col justify-between px-4">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{formater(exercise.tipo)}:</h1>
          <p className="pl-4 text-2xl md:pl-14">{exercise.pergunta}</p>
        </div>
        <div className="flex flex-col justify-center space-y-6 self-center md:flex-row md:space-x-6">
          {exercise.alternativas.map((alternativa, index) => {
            // Define a cor baseada no estado atual
            let buttonClasses =
              "border-2 rounded-md h-12 w-96 md:w-56 cursor-pointer transition duration-150 ease-in-out";

            if (isCorrect === null) {
              // Antes de enviar
              buttonClasses +=
                selected === alternativa
                  ? "border-purple-500 bg-purple-500 text-white"
                  : "border-[#525252] bg-[#3F3F46] hover:bg-zinc-600 text-white";
            } else {
              // Depois de enviar
              if (selected === alternativa) {
                buttonClasses += isCorrect
                  ? "border-lime-600 bg-lime-600 text-white"
                  : "border-red-600 bg-red-600 text-white";
              } else {
                buttonClasses += "border-[#525252] bg-[#3F3F46] text-white";
              }
            }

            return (
              <button
                key={index}
                type="button"
                onClick={() => isCorrect === null && setSelected(alternativa)} // impede re-selecionar depois de responder
                className={buttonClasses}
              >
                {alternativa}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] w-screen bg-zinc-600" />
      <div
        className={`flex w-full -translate-y-10 flex-col-reverse items-center px-4 md:-translate-y-0 md:flex-row md:space-y-0 md:space-x-20 ${
          isCorrect !== null ? "justify-center" : "justify-end"
        }`}
      >
        {feedback && (
          <div
            className={`flex flex-col space-y-2 text-center font-semibold md:text-xl ${
              isCorrect === true
                ? "text-lime-500"
                : isCorrect === false
                  ? "text-red-600"
                  : "text-white"
            }`}
          >
            <p>{feedback}</p>
            {!isCorrect && (
              <p className="self-start md:pl-8.5">
                Resposta Correta: {exercise.respostaCorreta}
              </p>
            )}
          </div>
        )}

        {isCorrect === null ? (
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-56 cursor-pointer rounded-md bg-lime-600 py-3 font-bold transition duration-150 ease-in-out hover:bg-lime-500 disabled:opacity-60"
          >
            {isPending ? "Enviando..." : "Verificar"}
          </button>
        ) : isCorrect === true ? (
          <Link to={`/home`}>
            <button className="w-56 cursor-pointer rounded-md bg-lime-500 py-3 transition duration-150 ease-in-out hover:bg-lime-600 disabled:opacity-60">
              Voltar para Home
            </button>
          </Link>
        ) : (
          <Link to={`/home`}>
            <button className="w-56 cursor-pointer rounded-md bg-red-600 py-3 font-bold transition duration-150 ease-in-out hover:bg-red-500 disabled:opacity-60">
              Voltar para Home
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
