import { useMutation, useQuery } from "@tanstack/react-query";
import * as exerciseApi from "@/service/exercise";

export function useNewExercise() {
  return useMutation({
    mutationFn: exerciseApi.newExercise,
  });
}

export function useExercise(id) {
  return useQuery({
    queryKey: ["exercise", id],
    queryFn: () => exerciseApi.getExercise(id),
  });
}

export function useSubmitExercise() {
  return useMutation({
    mutationFn: exerciseApi.submitExercise,
  });
}
