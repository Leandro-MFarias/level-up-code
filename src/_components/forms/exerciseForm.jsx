import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { exerciseSchema } from "@/types/exercise-schema";
import { useList } from "@/hooks/useList";
import { useNewExercise } from "@/hooks/useExercise";
import { toast } from "sonner";
import { useAuth } from "@/context/useUser";

export function ExerciseForm({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const { data: lists } = useList(user.id);
  const { mutateAsync: createExercise } = useNewExercise();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      listaId: "",
      pergunta: "",
      respostaCorreta: "",
      options: [{ value: "" }, { value: "" }],
    },
  });

  const tiposExercicio = [
    { value: "MULTIPLA_ESCOLHA", label: "Múltipla Escolha" },
    { value: "VERDADEIRO_FALSO", label: "Verdadeiro ou Falso" },
    { value: "PREENCHER_ESPACO", label: "Preencher os Espaços" },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  async function handleForm(data) {
    const payload = {
      ...data,
      alternativas: data.alternativas.map((alt) => alt.value),
      listaId: Number(data.listaId),
    };
    try {
      await createExercise(payload);
      toast.success("Exercício criado com sucesso!!");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }

    console.log("✅ Dados validados:", data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Exercício</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col space-y-4"
        >
          {/* LISTA */}
          <div className="flex flex-col space-y-2">
            <Controller
              control={control}
              name="listaId"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a lista" />
                  </SelectTrigger>
                  <SelectContent>
                    {lists.map((list) => (
                      <SelectItem key={list.id} value={String(list.id)}>
                        {list.titulo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className="h-4 text-sm text-red-500">
              {errors.listaId?.message}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Controller
              control={control}
              name="tipo"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposExercicio.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-sm text-red-500">{errors.tipo?.message}</p>
          </div>

          {/* PERGUNTA */}
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="Pergunta"
              {...register("pergunta")}
            />
            <p className="h-4 text-sm text-red-500">
              {errors.pergunta?.message}
            </p>
          </div>

          {/* RESPOSTA CORRETA */}
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="Resposta correta"
              {...register("respostaCorreta")}
            />
            <p className="h-4 text-sm text-red-500">
              {errors.respostaCorreta?.message}
            </p>
          </div>

          {/* ALTERNATIVAS */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-medium">Alternativas</h3>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder={`Alternativas ${index + 1}`}
                    {...register(`alternativas.${index}.value`)}
                  />
                  <p className="h-4 text-xs text-red-500">
                    {errors.alternativas?.[index]?.value?.message}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="self-start px-2"
                >
                  Remover
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ value: "" })}
            >
              Adicionar opção
            </Button>

            {errors.options?.message && (
              <p className="text-sm text-red-500">{errors.options.message}</p>
            )}
          </div>

          <Button type="submit" className="cursor-pointer">
            {isSubmitting ? "Criando..." : "Criar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
