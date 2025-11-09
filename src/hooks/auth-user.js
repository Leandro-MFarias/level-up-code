import { useMutation, useQuery } from "@tanstack/react-query"
import * as authApi from "../service/auth"

export function useRegister() {
  return useMutation({
    mutationFn: authApi.createAccount,
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: authApi.signIn,
  })
}

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: authApi.getUsers
  })
}