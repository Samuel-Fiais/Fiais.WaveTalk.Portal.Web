import { useMutation } from "@tanstack/react-query";
import { createUser, CreateUserVariables } from "../../../requests/user/createUser";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ResponseError } from "../../../common/ResponseError";

export const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: createUser,
    onError: (error: AxiosError<ResponseError>) => {
      enqueueSnackbar(error.response?.data.Message, { variant: "error" });
    }
  });

  const execute = (variables: CreateUserVariables) => {
    mutation.mutate(variables, {
      onSuccess: () => {
        enqueueSnackbar("Usuário criado com sucesso", { variant: "success" });
      }
    });
  };

  return {
    execute,
    finish: mutation.isSuccess,
    loading: mutation.isPending,
  };
}