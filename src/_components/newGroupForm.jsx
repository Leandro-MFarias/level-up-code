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
import { useNewGroup } from "@/hooks/useGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useList } from "@/hooks/useList";
import { toast } from "sonner";

const groupSchema = z.object({
  titulo: z.string().min(1, "Campo obrigatório"),
  listaId: z.string().min(1, "Selecione uma lista"),
});

export function NewGroupForm({ isOpenGroup, setIsOpenGroup }) {
  const { data: lists } = useList();
  const { mutateAsync: createGroup } = useNewGroup();
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(groupSchema),
  });

  async function handleForm(data) {
    try {
      await createGroup(data);
      setIsOpenGroup(false);
      toast.success("Grupo criado")
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <Dialog open={isOpenGroup} onOpenChange={setIsOpenGroup}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Grupo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="titulo do grupo"
              {...register("titulo")}
            />
            <p className="h-4 text-red-500">{errors.titulo?.message}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <Controller
              name="listaId" 
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="min-w-[164px]">
                    <SelectValue placeholder="Lista de exercícios" />
                  </SelectTrigger>
                  <SelectContent>
                    {lists?.map((list) => (
                      <SelectItem key={list.id} value={String(list.id)}>
                        {list.titulo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button type="submit" className="cursor-pointer">
            {isSubmitting ? "Criando" : "Criar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
