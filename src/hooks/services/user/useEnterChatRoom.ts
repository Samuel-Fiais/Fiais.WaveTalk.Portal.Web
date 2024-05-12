import { useMutation } from "@tanstack/react-query";
import {
  EnterChatRoomVariables,
  enterChatRoom,
} from "../../../requests/user/enterChatRoom";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { ResponseError } from "../../../common/ResponseError";

export const useEnterChatRoom = () => {
  const mutation = useMutation({
    mutationFn: enterChatRoom,
    onError: (error: AxiosError<ResponseError>) => {
      enqueueSnackbar(error.response?.data.Message, { variant: "error" });
    },
  });

  const execute = (variables: EnterChatRoomVariables) => {
    mutation.mutate(variables, {
      onSuccess: () => {
        enqueueSnackbar("Entrou na sala com sucesso", { variant: "success" });
      },
    });
  };

  return {
    execute,
    finish: mutation.isSuccess,
    loading: mutation.isPending,
  };
};
