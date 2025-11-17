import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as listApi from "../service/list";

export function useNewList() {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: listApi.newList,
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}

export function useList(id) {
  return useQuery({
    queryKey: ["lists", id],
    queryFn: () => listApi.getList(id),
    refetchOnWindowFocus: false,
  });
}
