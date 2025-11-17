import { ExerciseForm } from "./forms/exerciseForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NewListForm } from "./newListForm";
// import { NewGroupForm } from "./newGroupForm";
import { useGetUsers } from "@/hooks/auth-user";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Teacher() {
  const [isOpenList, setIsOpenList] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { data: users, isLoading } = useGetUsers();

  return (
    <>
      <div className="jusfice-content-center grid-row-2 grid w-full flex-1 gap-10 px-10 py-20 md:grid-cols-[1fr_440px]">
        <div className="flex w-full flex-col items-center space-y-20 rounded-md border-2 border-neutral-700 px-6 py-6">
          {/* HEADER */}
          <div>
            <h3 className="text-center text-2xl font-semibold text-white">
              Criação de Exercícios
            </h3>
          </div>

          <div className="flex w-full flex-col space-y-10">
            <Button
              onClick={() => setIsOpenList(true)}
              className="w-full cursor-pointer font-semibold md:py-6"
            >
              Nova Lista
            </Button>

            <Button
              onClick={() => setIsOpen(true)}
              className="w-full cursor-pointer font-semibold md:py-6"
            >
              Novo Exercício
            </Button>
          </div>
        </div>

        <div className="space-y-4 rounded-md border-2 border-neutral-700 px-2 py-6">
          <p className="text-3xl font-semibold text-purple-500">
            Lista de Alunos
          </p>
          {isLoading ? (
            <div className="flex h-[40vh] items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <ScrollArea className="h-60 md:h-[700px]">
              {users.map((user, index) => (
                <div key={index} className="flex flex-col space-y-1.5 pt-4">
                  <div className="flex justify-between pr-2">
                    <p>{user.nome}</p>
                    <p className="text-lime-400">
                      Completos: {user.exerciciosCompletos.length}
                    </p>
                  </div>
                  <p>{user.email}</p>
                  <div className="h-[1px] w-full bg-zinc-600" />
                </div>
              ))}
            </ScrollArea>
          )}
        </div>
      </div>
      <NewListForm isOpenList={isOpenList} setIsOpenList={setIsOpenList} />
      {/* <NewGroupForm isOpenGroup={isOpenGroup} setIsOpenGroup={setIsOpenGroup} /> */}
      <ExerciseForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
