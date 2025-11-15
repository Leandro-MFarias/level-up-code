import { FaStar } from "react-icons/fa6";
import { Link } from "react-router";
import { useList } from "@/hooks/useList";
import { useAuth } from "@/context/useUser";
import { Loader2 } from "lucide-react";

export function Journey() {
  const { user } = useAuth();
  const { data: lists, isLoading } = useList(user.id);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  console.log(lists);

  return (
    <div className="flex flex-1 flex-col items-center space-y-20 overflow-y-auto py-10">
      {lists.map((list) => (
        <div key={list.id} className="w-full px-10">
          <div className="flex w-full items-center space-x-10 px-16 pb-16">
            <div className="h-[1px] w-full bg-neutral-600" />
            <p className="text-center text-xl font-bold">{list.titulo}</p>
            <div className="h-[1px] w-full bg-neutral-600" />
          </div>
          <div className="space-y-2">
            {list?.exercicios.map((exercicio) => (
              <div
                key={exercicio}
                className="flex flex-col items-center space-y-4.5"
              >
                <div className="relative">
                  <Link to={`/exercises/${exercicio.id}`}>
                    <button
                      className={`btn relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-[50%] ${exercicio.respondido === true ? "completed bg-lime-500" : exercicio.respondido === false && exercicio.disponivel === true ? "todo bg-purple-600" : "blocked bg-zinc-600"}`}
                    >
                      <FaStar className="text-4xl" />
                    </button>
                  </Link>

                  <div
                    className={`absolute ${exercicio.respondido === false && exercicio.disponivel === true ? "block" : "hidden"}`}
                  >
                    <div
                      className={`relative inline-block translate-x-2 -translate-y-32 animate-bounce rounded border border-neutral-600/80 bg-[#252627] px-3 py-1 font-bold text-purple-500`}
                    >
                      START
                      <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-6 border-r-6 border-l-6 border-t-neutral-100 border-r-transparent border-l-transparent"></div>
                    </div>
                  </div>
                </div>
                <div className="h-4 w-2 rounded-full bg-zinc-500" />
                <div className="h-4 w-2 rounded-full bg-zinc-500" />
                <div className="h-4 w-2 rounded-full bg-zinc-500" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
