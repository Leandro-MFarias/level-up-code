import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as listApi from "../service/list";

export function useNewList() {
  const queryCLient = useQueryClient()

  return useMutation({
    mutationFn: listApi.newList,
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}

export function useList() {
  return useQuery({
    queryKey: ["lists"],
    queryFn: listApi.getList,
  });
}
