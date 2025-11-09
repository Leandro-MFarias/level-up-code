import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNewList } from "@/hooks/useList";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const listSchema = z.object({
  titulo: z.string().min(1, "Campo obrigatório"),
});

export function NewListForm({ isOpenList, setIsOpenList }) {
  const { mutateAsync: createList } = useNewList();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(listSchema),
  });

  async function handleForm(data) {
    try {
      await createList(data);
      setIsOpenList(false);
      toast.success("Lista criada!!")
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <Dialog open={isOpenList} onOpenChange={setIsOpenList}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova lista</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col space-y-4"
        >
          <Input
            type="text"
            placeholder="nome da lista"
            {...register("titulo")}
          />
          <p className="h-4 text-red-500">{errors.title?.message}</p>
          <Button type="submit" className="cursor-pointer">
            {isSubmitting ? "Criando.." : "Criar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
