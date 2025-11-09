import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as groupApi from "../service/group"

export function useNewGroup() {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: groupApi.newGroup,
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: [""] })
    }
  })
}